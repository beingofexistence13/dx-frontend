// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {ElementMixin} from '../mixins/element-mixin.js';

import {GestureEventListeners} from '../mixins/gesture-event-listeners.js';

import {DirMixin} from '../mixins/dir-mixin.js';

import {dedupingMixin} from '../utils/mixin.js';

import {dom, matchesSelector} from './polymer.dom.js';

import {setTouchAction} from '../utils/gestures.js';

import {Debouncer} from '../utils/debounce.js';

import {timeOut, microTask} from '../utils/async.js';

import {get} from '../utils/path.js';

import {scopeSubtree} from '../utils/scope-subtree.js';

import {findObservedAttributesGetter} from '../mixins/disable-upgrade-mixin.js';

import {register} from '../utils/telemetry.js';

export {LegacyElementMixin};


/**
 * Element class mixin that provides Polymer's "legacy" API intended to be
 * backward-compatible to the greatest extent possible with the API
 * found on the Polymer 1.x `Polymer.Base` prototype applied to all elements
 * defined using the `Polymer({...})` function.
 */
declare function LegacyElementMixin<T extends new (...args: any[]) => {}>(base: T): T & LegacyElementMixinConstructor & ElementMixinConstructor & PropertyEffectsConstructor & TemplateStampConstructor & PropertyAccessorsConstructor & PropertiesChangedConstructor & PropertiesMixinConstructor & GestureEventListenersConstructor & DirMixinConstructor;

import {ElementMixinConstructor} from '../mixins/element-mixin.js';

import {PropertyEffectsConstructor, PropertyEffects} from '../mixins/property-effects.js';

import {TemplateStampConstructor, TemplateStamp} from '../mixins/template-stamp.js';

import {PropertyAccessorsConstructor, PropertyAccessors} from '../mixins/property-accessors.js';

import {PropertiesChangedConstructor, PropertiesChanged} from '../mixins/properties-changed.js';

import {PropertiesMixinConstructor, PropertiesMixin} from '../mixins/properties-mixin.js';

import {GestureEventListenersConstructor} from '../mixins/gesture-event-listeners.js';

import {DirMixinConstructor} from '../mixins/dir-mixin.js';

interface LegacyElementMixinConstructor {
  new(...args: any[]): LegacyElementMixin;
}

export {LegacyElementMixinConstructor};

interface LegacyElementMixin extends ElementMixin, PropertyEffects, TemplateStamp, PropertyAccessors, PropertiesChanged, PropertiesMixin, GestureEventListeners, DirMixin {
  isAttached: boolean;
  _debouncers: {[key: string]: Function|null}|null;
  _legacyForceObservedAttributes: boolean|undefined;

  /**
   * Return the element whose local dom within which this element
   * is contained. This is a shorthand for
   * `this.getRootNode().host`.
   */
  readonly domHost: Node|null;
  is: string;

  /**
   * Overrides the default `Polymer.PropertyEffects` implementation to
   * add support for installing `hostAttributes` and `listeners`.
   */
  ready(): void;

  /**
   * Overrides the default `Polymer.PropertyEffects` implementation to
   * add support for class initialization via the `_registered` callback.
   * This is called only when the first instance of the element is created.
   */
  _initializeProperties(): void;
  _enableProperties(): void;

  /**
   * Provides an override implementation of `attributeChangedCallback`
   * which adds the Polymer legacy API's `attributeChanged` method.
   *
   * @param name Name of attribute.
   * @param old Old value of attribute.
   * @param value Current value of attribute.
   * @param namespace Attribute namespace.
   */
  attributeChangedCallback(name: string, old: string|null, value: string|null, namespace: string|null): void;

  /**
   * Provides an implementation of `connectedCallback`
   * which adds Polymer legacy API's `attached` method.
   */
  connectedCallback(): void;

  /**
   * Provides an implementation of `disconnectedCallback`
   * which adds Polymer legacy API's `detached` method.
   */
  disconnectedCallback(): void;
  _canApplyPropertyDefault(property: any): any;

  /**
   * Legacy callback called during the `constructor`, for overriding
   * by the user.
   */
  created(): void;

  /**
   * Sets the value of an attribute.
   * @param name The name of the attribute to change.
   * @param value The new attribute value.
   */
  setAttribute(name: string, value: string): void;

  /**
   * Removes an attribute.
   *
   * @param name The name of the attribute to remove.
   */
  removeAttribute(name: string): void;

  /**
   * Legacy callback called during `connectedCallback`, for overriding
   * by the user.
   */
  attached(): void;

  /**
   * Legacy callback called during `disconnectedCallback`, for overriding
   * by the user.
   */
  detached(): void;

  /**
   * Legacy callback called during `attributeChangedChallback`, for overriding
   * by the user.
   *
   * @param name Name of attribute.
   * @param old Old value of attribute.
   * @param value Current value of attribute.
   */
  attributeChanged(name: string, old: string|null, value: string|null): void;
  _takeAttributes(): void;

  /**
   * Called automatically when an element is initializing.
   * Users may override this method to perform class registration time
   * work. The implementation should ensure the work is performed
   * only once for the class.
   */
  _registered(): void;

  /**
   * Ensures an element has required attributes. Called when the element
   * is being readied via `ready`. Users should override to set the
   * element's required attributes. The implementation should be sure
   * to check and not override existing attributes added by
   * the user of the element. Typically, setting attributes should be left
   * to the element user and not done here; reasonable exceptions include
   * setting aria roles and focusability.
   */
  _ensureAttributes(): void;

  /**
   * Adds element event listeners. Called when the element
   * is being readied via `ready`. Users should override to
   * add any required element event listeners.
   * In performance critical elements, the work done here should be kept
   * to a minimum since it is done before the element is rendered. In
   * these elements, consider adding listeners asynchronously so as not to
   * block render.
   */
  _applyListeners(): void;

  /**
   * Converts a typed JavaScript value to a string.
   *
   * Note this method is provided as backward-compatible legacy API
   * only.  It is not directly called by any Polymer features. To customize
   * how properties are serialized to attributes for attribute bindings and
   * `reflectToAttribute: true` properties as well as this method, override
   * the `_serializeValue` method provided by `Polymer.PropertyAccessors`.
   *
   * @param value Value to deserialize
   * @returns Serialized value
   */
  serialize(value: any): string|undefined;

  /**
   * Converts a string to a typed JavaScript value.
   *
   * Note this method is provided as backward-compatible legacy API
   * only.  It is not directly called by any Polymer features.  To customize
   * how attributes are deserialized to properties for in
   * `attributeChangedCallback`, override `_deserializeValue` method
   * provided by `Polymer.PropertyAccessors`.
   *
   * @param value String to deserialize
   * @param type Type to deserialize the string to
   * @returns Returns the deserialized value in the `type` given.
   */
  deserialize(value: string, type: any): any;

  /**
   * Serializes a property to its associated attribute.
   *
   * Note this method is provided as backward-compatible legacy API
   * only.  It is not directly called by any Polymer features.
   *
   * @param property Property name to reflect.
   * @param attribute Attribute name to reflect.
   * @param value Property value to reflect.
   */
  reflectPropertyToAttribute(property: string, attribute?: string, value?: any): void;

  /**
   * Sets a typed value to an HTML attribute on a node.
   *
   * Note this method is provided as backward-compatible legacy API
   * only.  It is not directly called by any Polymer features.
   *
   * @param value Value to serialize.
   * @param attribute Attribute name to serialize to.
   * @param node Element to set attribute to.
   */
  serializeValueToAttribute(value: any, attribute: string, node: Element|null): void;

  /**
   * Copies own properties (including accessor descriptors) from a source
   * object to a target object.
   *
   * @param prototype Target object to copy properties to.
   * @param api Source object to copy properties from.
   * @returns prototype object that was passed as first argument.
   */
  extend(prototype: object|null, api: object|null): object|null;

  /**
   * Copies props from a source object to a target object.
   *
   * Note, this method uses a simple `for...in` strategy for enumerating
   * properties.  To ensure only `ownProperties` are copied from source
   * to target and that accessor implementations are copied, use `extend`.
   *
   * @param target Target object to copy properties to.
   * @param source Source object to copy properties from.
   * @returns Target object that was passed as first argument.
   */
  mixin(target: object, source: object): object;

  /**
   * Sets the prototype of an object.
   *
   * Note this method is provided as backward-compatible legacy API
   * only.  It is not directly called by any Polymer features.
   *
   * @param object The object on which to set the prototype.
   * @param prototype The prototype that will be set on the given
   * `object`.
   * @returns Returns the given `object` with its prototype set
   * to the given `prototype` object.
   */
  chainObject(object: object|null, prototype: object|null): object|null;

  /**
   * Calls `importNode` on the `content` of the `template` specified and
   * returns a document fragment containing the imported content.
   *
   * @param template HTML template element to instance.
   * @returns Document fragment containing the imported
   *   template content.
   */
  instanceTemplate(template: HTMLTemplateElement|null): DocumentFragment;

  /**
   * Dispatches a custom event with an optional detail value.
   *
   * @param type Name of event type.
   * @param detail Detail value containing event-specific
   *   payload.
   * @param options Object specifying options.  These may include:
   *  `bubbles` (boolean, defaults to `true`),
   *  `cancelable` (boolean, defaults to false), and
   *  `node` on which to fire the event (HTMLElement, defaults to `this`).
   * @returns The new event that was fired.
   */
  fire(type: string, detail?: any, options?: {bubbles?: boolean, cancelable?: boolean, composed?: boolean}): Event;

  /**
   * Convenience method to add an event listener on a given element,
   * late bound to a named method on this element.
   *
   * @param node Element to add event listener to.
   * @param eventName Name of event to listen for.
   * @param methodName Name of handler method on `this` to call.
   */
  listen(node: EventTarget|null, eventName: string, methodName: string): void;

  /**
   * Convenience method to remove an event listener from a given element,
   * late bound to a named method on this element.
   *
   * @param node Element to remove event listener from.
   * @param eventName Name of event to stop listening to.
   * @param methodName Name of handler method on `this` to not call
   *      anymore.
   */
  unlisten(node: EventTarget|null, eventName: string, methodName: string): void;

  /**
   * Override scrolling behavior to all direction, one direction, or none.
   *
   * Valid scroll directions:
   *   - 'all': scroll in any direction
   *   - 'x': scroll only in the 'x' direction
   *   - 'y': scroll only in the 'y' direction
   *   - 'none': disable scrolling for this node
   *
   * @param direction Direction to allow scrolling
   * Defaults to `all`.
   * @param node Element to apply scroll direction setting.
   * Defaults to `this`.
   */
  setScrollDirection(direction?: string, node?: Element|null): void;

  /**
   * Convenience method to run `querySelector` on this local DOM scope.
   *
   * This function calls `Polymer.dom(this.root).querySelector(slctr)`.
   *
   * @param slctr Selector to run on this local DOM scope
   * @returns Element found by the selector, or null if not found.
   */
  $$(slctr: string): Element|null;

  /**
   * Force this element to distribute its children to its local dom.
   * This should not be necessary as of Polymer 2.0.2 and is provided only
   * for backwards compatibility.
   */
  distributeContent(): void;

  /**
   * Returns a list of nodes that are the effective childNodes. The effective
   * childNodes list is the same as the element's childNodes except that
   * any `<content>` elements are replaced with the list of nodes distributed
   * to the `<content>`, the result of its `getDistributedNodes` method.
   *
   * @returns List of effective child nodes.
   */
  getEffectiveChildNodes(): Node[];

  /**
   * Returns a list of nodes distributed within this element that match
   * `selector`. These can be dom children or elements distributed to
   * children that are insertion points.
   *
   * @param selector Selector to run.
   * @returns List of distributed elements that match selector.
   */
  queryDistributedElements(selector: string): Node[];

  /**
   * Returns a list of elements that are the effective children. The effective
   * children list is the same as the element's children except that
   * any `<content>` elements are replaced with the list of elements
   * distributed to the `<content>`.
   *
   * @returns List of effective children.
   */
  getEffectiveChildren(): Node[];

  /**
   * Returns a string of text content that is the concatenation of the
   * text content's of the element's effective childNodes (the elements
   * returned by <a href="#getEffectiveChildNodes>getEffectiveChildNodes</a>.
   *
   * @returns List of effective children.
   */
  getEffectiveTextContent(): string;

  /**
   * Returns the first effective childNode within this element that
   * match `selector`. These can be dom child nodes or elements distributed
   * to children that are insertion points.
   *
   * @param selector Selector to run.
   * @returns First effective child node that matches selector.
   */
  queryEffectiveChildren(selector: string): Node|null;

  /**
   * Returns a list of effective childNodes within this element that
   * match `selector`. These can be dom child nodes or elements distributed
   * to children that are insertion points.
   *
   * @param selector Selector to run.
   * @returns List of effective child nodes that match
   *     selector.
   */
  queryAllEffectiveChildren(selector: string): Node[];

  /**
   * Returns a list of nodes distributed to this element's `<slot>`.
   *
   * If this element contains more than one `<slot>` in its local DOM,
   * an optional selector may be passed to choose the desired content.
   *
   * @param slctr CSS selector to choose the desired
   *   `<slot>`.  Defaults to `content`.
   * @returns List of distributed nodes for the `<slot>`.
   */
  getContentChildNodes(slctr?: string): Node[];

  /**
   * Returns a list of element children distributed to this element's
   * `<slot>`.
   *
   * If this element contains more than one `<slot>` in its
   * local DOM, an optional selector may be passed to choose the desired
   * content.  This method differs from `getContentChildNodes` in that only
   * elements are returned.
   *
   * @param slctr CSS selector to choose the desired
   *   `<content>`.  Defaults to `content`.
   * @returns List of distributed nodes for the
   *   `<slot>`.
   */
  getContentChildren(slctr?: string): HTMLElement[];

  /**
   * Checks whether an element is in this element's light DOM tree.
   *
   * @param node The element to be checked.
   * @returns true if node is in this element's light DOM tree.
   */
  isLightDescendant(node: Node|null): boolean;

  /**
   * Checks whether an element is in this element's local DOM tree.
   *
   * @param node The element to be checked.
   * @returns true if node is in this element's local DOM tree.
   */
  isLocalDescendant(node: Element): boolean;

  /**
   * No-op for backwards compatibility. This should now be handled by
   * ShadyCss library.
   *
   * @param container Container element to scope
   * @param shouldObserve if true, start a mutation observer for added nodes to the container
   * @returns Returns a new MutationObserver on `container` if `shouldObserve` is true.
   */
  scopeSubtree(container: Element, shouldObserve?: boolean): MutationObserver|null;

  /**
   * Returns the computed style value for the given property.
   *
   * @param property The css property name.
   * @returns Returns the computed css property value for the given
   * `property`.
   */
  getComputedStyleValue(property: string): string;

  /**
   * Call `debounce` to collapse multiple requests for a named task into
   * one invocation which is made after the wait time has elapsed with
   * no new request.  If no wait time is given, the callback will be called
   * at microtask timing (guaranteed before paint).
   *
   *     debouncedClickAction(e) {
   *       // will not call `processClick` more than once per 100ms
   *       this.debounce('click', function() {
   *        this.processClick();
   *       } 100);
   *     }
   *
   * @param jobName String to identify the debounce job.
   * @param callback Function that is called (with `this`
   *   context) when the wait time elapses.
   * @param wait Optional wait time in milliseconds (ms) after the
   *   last signal that must elapse before invoking `callback`
   * @returns Returns a debouncer object on which exists the
   * following methods: `isActive()` returns true if the debouncer is
   * active; `cancel()` cancels the debouncer if it is active;
   * `flush()` immediately invokes the debounced callback if the debouncer
   * is active.
   */
  debounce(jobName: string, callback: () => void, wait?: number): object;

  /**
   * Returns whether a named debouncer is active.
   *
   * @param jobName The name of the debouncer started with `debounce`
   * @returns Whether the debouncer is active (has not yet fired).
   */
  isDebouncerActive(jobName: string): boolean;

  /**
   * Immediately calls the debouncer `callback` and inactivates it.
   *
   * @param jobName The name of the debouncer started with `debounce`
   */
  flushDebouncer(jobName: string): void;

  /**
   * Cancels an active debouncer.  The `callback` will not be called.
   *
   * @param jobName The name of the debouncer started with `debounce`
   */
  cancelDebouncer(jobName: string): void;

  /**
   * Runs a callback function asynchronously.
   *
   * By default (if no waitTime is specified), async callbacks are run at
   * microtask timing, which will occur before paint.
   *
   * @param callback The callback function to run, bound to
   *     `this`.
   * @param waitTime Time to wait before calling the
   *   `callback`.  If unspecified or 0, the callback will be run at microtask
   *   timing (before paint).
   * @returns Handle that may be used to cancel the async job.
   */
  async(callback: Function, waitTime?: number): number;

  /**
   * Cancels an async operation started with `async`.
   *
   * @param handle Handle returned from original `async` call to
   *   cancel.
   */
  cancelAsync(handle: number): void;

  /**
   * Convenience method for creating an element and configuring it.
   *
   * @param tag HTML element tag to create.
   * @param props Object of properties to configure on the
   *    instance.
   * @returns Newly created and configured element.
   */
  create(tag: string, props?: object|null): Element;

  /**
   * Polyfill for Element.prototype.matches, which is sometimes still
   * prefixed.
   *
   * @param selector Selector to test.
   * @param node Element to test the selector against.
   * @returns Whether the element matches the selector.
   */
  elementMatches(selector: string, node?: Element): boolean;

  /**
   * Toggles an HTML attribute on or off.
   *
   * @param name HTML attribute name
   * @param bool Boolean to force the attribute on or off.
   *    When unspecified, the state of the attribute will be reversed.
   * @returns true if the attribute now exists
   */
  toggleAttribute(name: string, bool?: boolean): boolean;

  /**
   * Toggles a CSS class on or off.
   *
   * @param name CSS class name
   * @param bool Boolean to force the class on or off.
   *    When unspecified, the state of the class will be reversed.
   * @param node Node to target.  Defaults to `this`.
   */
  toggleClass(name: string, bool?: boolean, node?: Element|null): void;

  /**
   * Cross-platform helper for setting an element's CSS `transform` property.
   *
   * @param transformText Transform setting.
   * @param node Element to apply the transform to.
   * Defaults to `this`
   */
  transform(transformText: string, node?: Element|null): void;

  /**
   * Cross-platform helper for setting an element's CSS `translate3d`
   * property.
   *
   * @param x X offset.
   * @param y Y offset.
   * @param z Z offset.
   * @param node Element to apply the transform to.
   * Defaults to `this`.
   */
  translate3d(x: number|string, y: number|string, z: number|string, node?: Element|null): void;

  /**
   * Removes an item from an array, if it exists.
   *
   * If the array is specified by path, a change notification is
   * generated, so that observers, data bindings and computed
   * properties watching that path can update.
   *
   * If the array is passed directly, **no change
   * notification is generated**.
   *
   * @param arrayOrPath Path to array from
   *     which to remove the item
   *   (or the array itself).
   * @param item Item to remove.
   * @returns Array containing item removed.
   */
  arrayDelete(arrayOrPath: string|Array<number|string>, item: any): any[]|null;

  /**
   * Facades `console.log`/`warn`/`error` as override point.
   *
   * @param level One of 'log', 'warn', 'error'
   * @param args Array of strings or objects to log
   */
  _logger(level: string, args: any[]|null): void;

  /**
   * Facades `console.log` as an override point.
   *
   * @param args Array of strings or objects to log
   */
  _log(...args: any[]): void;

  /**
   * Facades `console.warn` as an override point.
   *
   * @param args Array of strings or objects to log
   */
  _warn(...args: any[]): void;

  /**
   * Facades `console.error` as an override point.
   *
   * @param args Array of strings or objects to log
   */
  _error(...args: any[]): void;

  /**
   * Formats a message using the element type an a method name.
   *
   * @param methodName Method name to associate with message
   * @param args Array of strings or objects to log
   * @returns Array with formatting information for `console`
   *   logging.
   */
  _logf(methodName: string, ...args: any[]): any[];
}
