---
lang: en
position: 10
published: true
title: Learn
---

# Introduction

## What is Scully?

Scully is the best static site generator for Angular projects looking to embrace the [Jamstack](https://jamstack.org/).

It will use your application and will create a static `index.html` for each of your pages/routes. Each and every `index.html` will have the content already there, and this will make your application show instantly for the user. Also, this will make your application very SEO friendly. On top of this, your SPA will still function as it did before.  
Also, Scully has an easy to use and extensible plugins system that allows custom routes and content manipulation.

All about Scully in one video:
<a class="docs-icon-button" href="https://thinkster.io/tutorials/scully-webinar-building-the-fastest-angular-apps-possible">
<img src="/assets/img/icons/play-solid.svg" alt="play video"/>
Building the Fastest Angular Apps Possible
</a>

## How does it work?

Scully analyzes the route structure of your Angular application and uses that to create a list of routes. (you can add those manually if needed). Then it will go over this list, and generate an `index.html` for each of them. See [the Scully process](/docs/concepts/process) for in-depth details

## How do I use it?

Add Scully to your project:

```bash
ng add @scullyio/init
ng build --prod
npx scully
```

For a more elaborate explanation see our getting started.

### Also, Scully provides:

(note, these are only a _few_ highlights; there is much more with Scully.)

- [Render .md files as .html](/docs/learn/create-a-blog/add-blog-support) and [extract data from generated routes](/docs/learn/create-a-blog/use-blog-post-data-in-template) to use in Angular templates.
- A [flexible and extensible plugin system](/docs/Reference/plugins/overview) to bake your own functionality into Scully's processes.
- Several [Angular schematics](/docs/Reference/schematics/create-scully-files-with-ng-add) to make its usage **as easy as possible!**

Scully supports Windows, Linux and macOS.
