import type { Observer, Subscription } from "rxjs"
import "./declare-values"

type _DOMElement = Element

declare global {
  namespace JSX {
    type DOMElement = _DOMElement

    /** Props shared between {@link HTMLElement}s and {@link SVGElement}s. */
    interface ElementProps<T extends DOMElement = DOMElement> {
      /** Describe the actual tagName to use */
      is?: string
      /** The children elements accept */
      children?: Children
      /**
       * Note: If you imported rxjs-extensions, you can use `Observable<T>.prototype.map$Class((from: T) => classes)`
       */
      $class?: $ClassValue
      /**
       * Access the current element after the element has been created with children (but before being mounted).
       *
       * This includes the element's subscription so you can add subscriptions to be unsubscribed when the element is dropped.
       */
      ref?: RefValue<T>
      /** Add tags to the className where each of these tags will be prefixed with `tag-${item}` */
      tags?: Value<string[]>
      /**
       * Assign individual style properties with each emit.
       * For performance reasons, we do not track "unset" values,
       * so if you do `.next({ top: "2px" })` and then `.next({})`, the
       * style will still include `top: 2px`. This makes performance
       * predicatable for animation, and it ensures compatibility with
       * an added "style" property (as long as the style property isn't
       * also an observable).
       */
      $style?: $StyleValue
    }

    interface HtmlProps<T extends HTMLElement = HTMLElement> extends ElementProps<T> {}
    interface SvgProps<T extends SVGElement = SVGElement> extends ElementProps<T> {}
  }
}
