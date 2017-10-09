import Options from './src/options'
import Regular from './src/regular'
import IFrame from './src/iframe'
import Table from './src/table'

/**
 * indicate - jQuery Scroll Indicator Plugin
 *
 * Adds horizontal fade effect to tables and iframes.
 * Intended to let the user know that there is more content so see than currently fits.
 *
 * @author Matthias Giger <matthias.giger@namics.com>
 */
class Indicate {
  constructor (targetElements, options) {
    if (typeof options !== 'object') {
      options = {}
    }

    this.targetElements = targetElements
    this.instances = []
    this.options = new Options(options)

    this.init()
  }

  /**
   * Initializes the instances depending on whether it's a single element or
   * an array of nodes.
   */
  init () {
    const elements = this.targetElements

    if (elements) {
      if (elements.length) {
        [].map.call(elements,
          (element) => this.createInstanceForElement(element)
        )
      } else {
        this.createInstanceForElement(elements)
      }
    }
  }

  /**
   * Creates an instance of the appropriate class depending on the elements tag.
   */
  createInstanceForElement (element) {
    const tagName = String(element.tagName).toLowerCase()

    switch (tagName) {
      case 'iframe':
        this.instances.push(new IFrame(element, this.options))
        break
      case 'table':
        this.instances.push(new Table(element, this.options))
        break
      default:
        this.instances.push(new Regular(element, this.options))
    }
  }
}

export default Indicate
