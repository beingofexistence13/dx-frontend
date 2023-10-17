// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {dedupingMixin} from '../utils/mixin.js';

import {register, incrementInstanceCount} from '../utils/telemetry.js';

import {PropertiesChanged} from './properties-changed.js';

export {PropertiesMixin};


/**
 * Mixin that provides a minimal starting point to using the PropertiesChanged
 * mixin by providing a mechanism to declare properties in a static
 * getter (e.g. static get properties() { return { foo: String } }). Changes
 * are reported via the `_propertiesChanged` method.
 *
 * This mixin provides no specific support for rendering. Users are expected
 * to create a ShadowRoot and put content into it and update it in whatever
 * way makes sense. This can be done in reaction to properties changing by
 * implementing `_propertiesChanged`.
 */
declare function PropertiesMixin<T extends new (...args: any[]) => {}>(base: T): T & PropertiesMixinConstructor & PropertiesChangedConstructor;

import {PropertiesChangedConstructor} from './properties-changed.js';

interface PropertiesMixinConstructor {
  new(...args: any[]): PropertiesMixin;

  /**
   * Overrides `PropertiesChanged` method to return type specified in the
   * static `properties` object for the given property.
   *
   * @param name Name of property
   * @returns Type to which to deserialize attribute
   */
  typeForProperty(name: string): any;

  /**
   * Finalizes an element definition, including ensuring any super classes
   * are also finalized. This includes ensuring property
   * accessors exist on the element prototype. This method calls
   * `_finalizeClass` to finalize each constructor in the prototype chain.
   */
  finalize(): void;

  /**
   * Finalize an element class. This includes ensuring property
   * accessors exist on the element prototype. This method is called by
   * `finalize` and finalizes the class constructor.
   */
  _finalizeClass(): void;
}

export {PropertiesMixinConstructor};

interface PropertiesMixin extends PropertiesChanged {

  /**
   * Overrides `PropertiesChanged` method and adds a call to
   * `finalize` which lazily configures the element's property accessors.
   */
  _initializeProperties(): void;

  /**
   * Called when the element is added to a document.
   * Calls `_enableProperties` to turn on property system from
   * `PropertiesChanged`.
   */
  connectedCallback(): void;

  /**
   * Called when the element is removed from a document
   */
  disconnectedCallback(): void;
}
