import {
  CSSProperties,
  Direction,
  Options,
  isHorizontal,
  isVertical,
  Theme,
} from './types'

const directionToRotation = {
  [Direction.left]: 180,
  [Direction.right]: 0,
  [Direction.top]: 270,
  [Direction.bottom]: 90,
}

// Apply style object as inline-style to an element.
const add = (element: HTMLElement, properties: CSSProperties) => {
  Object.keys(properties).forEach((property) => {
    element.style[property] = properties[property]
  })
}

const alignment = (direction: Direction, options: Options) => {
  const style: CSSProperties = {}
  const horizontal = isHorizontal(direction)
  const vertical = isVertical(direction)

  if (horizontal) {
    style.top = '0'
  }

  if (vertical) {
    style.left = '0'
  }

  style.width = horizontal ? options.width : '100%'
  style.height = vertical ? options.width : '100%'

  return style
}

const base: Theme = {
  indicator: (_, direction: Direction, options: Options) => {
    const style: CSSProperties = {
      position: 'absolute',
      // Initially hidden.
      display: 'none',
      cursor: options.click ? 'pointer' : 'inherit',
      [direction]: '0',
    }

    if (isHorizontal(direction)) {
      style.alignItems =
        options.arrow && options.arrow.position !== 'center'
          ? `flex-${options.arrow.position}`
          : 'center'
      style.justifyContent = 'center'
    } else {
      style.justifyContent =
        options.arrow && options.arrow.position !== 'center'
          ? `flex-${options.arrow.position}`
          : 'center'
      style.alignItems = 'center'
    }

    return { ...style, ...alignment(direction, options) }
  },
  hide: (indicator: HTMLSpanElement) => {
    indicator.style.display = 'none'
  },
  show: (indicator: HTMLSpanElement) => {
    indicator.style.display = 'flex'
  },
  arrow: (_, direction: Direction) => ({
    width: '12px',
    height: '12px',
    display: 'block',
    transform: `rotate(${directionToRotation[direction]}deg)`,
  }),
  element: () => undefined,
  innerWrapper: {
    position: 'relative',
    // TODO check if possible without inner wrapper if element is inline-block.
    display: 'inline-block',
  },
  outerWrapper: {
    position: 'relative',
  } as CSSProperties,
  observer: (_, direction, options) =>
    ({
      position: 'absolute',
      pointerEvents: 'none',
      [direction]: '0',
      ...alignment(direction, options),
    } as CSSProperties),
}

type ThemeKey = keyof Theme

const apply = (
  method: ((...args: any[]) => CSSProperties | void) | CSSProperties,
  ...args: any[]
) => {
  if (typeof method === 'object') {
    return method
  }

  const result = method(...args)

  if (typeof result === 'object') {
    return result
  }

  return undefined
}

export const theme = (
  element: HTMLElement,
  key: ThemeKey,
  options: Options,
  ...args: any[]
) => {
  let userProperties: CSSProperties | undefined

  if (options.theme && options.theme[key]) {
    userProperties = apply(options.theme[key], element, ...args, options)
  }

  const baseProperties = apply(base[key], element, ...args, options)

  const styles = userProperties
    ? { ...baseProperties, ...userProperties }
    : baseProperties

  if (styles) {
    add(element, styles)
  }
}

export const hideScrollbar = (element: HTMLElement) => {
  add(element, {
    // Hide scrollbar in IE and Edge.
    // @ts-ignore
    '-ms-overflow-style': 'none',
    // Hide scrollbar in Firefox.
    'scrollbar-width': 'none',
  })
}
