# Astro Context

**Astro Context** is a library designed to simplify the creation and sharing of
data across components in Astro.

## Usage

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
update their levels based on their context.

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

Enjoy!
