# Astro Context

**Astro Context** is a library designed to simplify the creation and sharing of
data across components in Astro.

[![NPM Version][npm-img]][npm-url]
[![NPM Downloads][download-img]][download-url]
[![Open in StackBlitz][stackblitz-img]][stackblitz-url]

```bash
npm install @astropub/context
```

## Usage

### Creating Context

Create new context using the `createContext` method.

```ts
/** @file ~/context/sections.ts */

import { createContext } from '@astropub/context'

const [ Provider, getContext ] = createContext<{ level: number }>()
```

### Preparing a Provider

Wrap a component with a `Provider` to set its context.

```astro
---
/** @file ~/components/Section.astro */

import { Provider, getContext } from '../context/section.ts'

// set the current level to be 1 higher, or set it to 1
const level = (getContext()?.level + 1) || 1
---

<Provider level={level}>
  <section>
    <slot />
  </section>
</Provider>
```

#### Accessing Context

Use `getContext` to access the current context in other components.

```astro
---
/** @file ~/components/Heading.astro */

import { getContext } from '../context/section.ts'

const context = getContext()

// get the current level or 1
const level = getContext()?.level || 1
---

<h3 aria-level={level} {...Astro.props}>
  <slot />
</h3>
```

### Example

Use these components to create nested sections with headings that dynamically
update their levels based on the context.

```astro
---
import Section from '../components/Section.astro'
import Heading from '../components/Heading.astro'
---

<Section>
  <Heading>Title</Heading>
  <p>This section uses a heading of level 1.</p>
 
  <Section>
    <Heading>Heading</Heading>
    <p>This section uses a heading of level 2.</p>

    <Section>
      <Heading>Sub-Heading</Heading>
      <p>This section uses a heading of level 3.</p>

      <Section>
        <Heading>Sub-Sub-Heading</Heading>
        <p>This section uses a heading of level 4.</p>
      </Section>
    </Section>
  </Section>
</Section>
```

This will produce the following HTML:

```html
<section>
  <h3 aria-level="1">Title</h3>
  <p>This section uses a heading of level 1.</p>

  <section>
    <h3 aria-level="2">Heading</h3>
    <p>This section uses a heading of level 2.</p>

    <section>
      <h3 aria-level="3">Sub-Heading</h3>
      <p>This section uses a heading of level 3.</p>

      <section>
        <h3 aria-level="4">Sub-Sub-Heading</h3>
        <p>This section uses a heading of level 4.</p>
      </section>
    </section>
  </section>
</section>
```

<br />

Enjoy!

## Project Structure

Inside of this Astro project, you'll see the following folders and files:

```
/
├── demo/
│   ├── public/
│   └── src/
│       └── pages/
            ├── index.astro
│           └── ...etc
└── packages/
    └── context/
        ├── package.json
        └── ...etc
```

This project uses **workspaces** to develop a single package, `@astropub/context`.

It also includes a minimal Astro project, `demo`, for developing and demonstrating the component.

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
|:------------------|:---------------------------------------------|
| `npm install`     | Installs dependencies                        |
| `npm run start`   | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

Want to learn more?
Read the [Astro documentation][docs-url] or jump into the [Astro Discord][chat-url].

[chat-url]: https://astro.build/chat
[docs-url]: https://github.com/astro-community/context

[npm-img]: https://img.shields.io/npm/v/@astropub/context?color=%23444&label=&labelColor=%23CB0000&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjE1MCAxNTAgNDAwIDQwMCIgZmlsbD0iI0ZGRiI+PHBhdGggZD0iTTE1MCA1NTBoMjAwVjI1MGgxMDB2MzAwaDEwMFYxNTBIMTUweiIvPjwvc3ZnPg==&style=for-the-badge
[npm-url]: https://www.npmjs.com/package/@astropub/context
[stackblitz-img]: https://img.shields.io/badge/-Open%20in%20Stackblitz-%231374EF?color=%23444&labelColor=%231374EF&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjEwIDggMTIgMTgiIGhlaWdodD0iMTgiIGZpbGw9IiNGRkYiPjxwYXRoIGQ9Ik0xMCAxNy42aDUuMmwtMyA3LjRMMjIgMTQuNGgtNS4ybDMtNy40TDEwIDE3LjZaIi8+PC9zdmc+&style=for-the-badge
[stackblitz-url]: https://stackblitz.com/github/astro-community/context/tree/main/demo?file=README.md
[bundlejs-img]: https://img.shields.io/bundlejs/size/@astropub%2Fcontext?style=for-the-badge
[bundlejs-url]: https://bundlejs.com/?bundle&q=@astropub/context
[download-url]: https://www.npmjs.com/package/@astropub/context
[download-img]: https://img.shields.io/badge/dynamic/json?url=https://api.npmjs.org/downloads/point/last-week/@astropub/context&query=downloads&label=⇓+week&color=%23444&labelColor=%23EEd100&style=for-the-badge
