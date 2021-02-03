# indicate

<img align="right" src="https://github.com/tobua/indicate/raw/master/logo.png" width="20%" alt="Indicate Scroll Plugin" />

Indicates possible scroll using a fade effect in elements with overflow.

> Requires browser support for IntersectionObserver (no IE11) and the build tool to work with ES Modules.

[![indicate Demo](https://img.shields.io/static/v1?label=indicate&message=Demo&color=brightgreen)](https://tobua.github.io/indicate)

## Installation & Usage

```
npm install indicate
```

```tsx
import { indicate } from 'indicate'

indicate('#my-element')
indicate(document.querySelectorAll('.nav-bar'))
```

### React

```tsx
import { useIndicate } from 'indicate'

const Scrollable = () => {
  const ref = useIndicate({ arrow: false })

  return (
    <div ref={ref}>
      {...}
    </div>
  )
}
```

### React Native

See [indicate/plugins/react-native](https://github.com/tobua/indicate/tree/master/plugins/react-native) note that this plugin is quite different and has some drawbacks compared to the web version.

## Options

```ts
indicate(document.getElementById('my-element'), {
  // Disable arrows, default true.
  arrow: false,
  // Position of arrows, default 'center'.
  arrowPosition: 'start',
  // TODO
  arrowUrl: '/assets/icon/arrow-left.svg',
  // TODO
  arrowMarkup: '<svg>...</svg>',
  // Change fade color, default white.
  color: '#0000FF',
  // Configure the width of the fade effect, default 20px.
  width: '3vw',
  // Click on indicator to scroll, default true.
  click: false,
})
```

## Instance

```tsx
import { indicate, remove } from 'indicate'

indicate('#my-element')

// Remove the added listeners, wrappers and elements.
remove('#my-element')

// Reinitialize with different options.
indicate('#my-element', { arrow: false })
```
