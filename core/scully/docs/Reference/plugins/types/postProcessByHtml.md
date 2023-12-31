---
title: postProcessByHtml Plugin Type
published: true
lang: en
position: 100
---

# `postProcessByHtml` Plugin Type

## Overview

A **postProcessByHtml plugin** is used to transform the rendered HTML.  
After the Angular application renders, the HTML content is passed to a **postProcessByHtml plugin** where it can be further modified.

A **postProcessByHtml plugin** could be used to transform a page containing markdown into a page that renders it.

## Interface

A **postProcessByHtml plugin** is a function that returns a `Promise<String>`. The string in the promise must be the transformed
HTML. The interface looks like this:

```typescript
function exampleContentPlugin(
  HTML: string,
  route: HandledRoute
): Promise<string> {
  // Must return a promise
}
```

## Making A `postProcessByHtml` Plugin

The following **`postProcessByHtml` plugin** example adds a title to the header to a page if it does not find one.

```typescript
const { registerPlugin } = require('@scullyio/scully');

function defaultTitlePlugin(html, route) {
  // If no title in the document
  if (html.indexOf('<title') < 0) {
    const splitter = '</head>';
    const [begin, end] = html.split(splitter);
    const defaultTitle = `<title>The Truth Is Out There!</title>`;
    return Promise.resolve(`${begin}${defaultTitle}${splitter}${end}`);
  }
  return Promise.resolve(html);
}

// DON NOT FORGET REGISTER THE PLUGIN
const validator = async (conf) => [];
registerPlugin(
  'postProcessByHtml',
  'defaultTitle',
  defaultTitlePlugin,
  validator
);

module.exports.defaultTitlePlugin = defaultTitlePlugin;
```

In the above example, the Angular app's HTML content is transformed to include a title because anyone was found.

The next example replaces any instances of `:)` with an smiley emoji.

```typescript
const { registerPlugin } = require('@scullyio/scully');

function smileEmojiPlugin(html, route) {
  return Promise.resolve(html.replace(/\:\)/g, '😊'));
}
// DON NOT FORGET REGISTER THE PLUGIN
const validator = async (conf) => [];
registerPlugin('postProcessByHtml', 'smiles', smileEmojiPlugin, validator);

module.exports.smileEmojiPlugin = smileEmojiPlugin;
```
