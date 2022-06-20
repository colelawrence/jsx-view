import type { Observable, Observer, Subscription } from "rxjs"

// Fixes snowpack failing to import this file
export default 0

declare global {
  namespace JSX {
    type Value<T> = Observable<T | undefined> | T
    type StringValue = Value<string>
    type NumberValue = Value<number>
    type BooleanValue = Value<boolean>
    type DateValue = Value<Date>
    type RefValue<T = DOMElement> = ((dom: T, sub: Subscription) => any) | Observer<{ dom: T; sub: Subscription }>
    type $StyleValue = Value<Partial<CSSStyleDeclaration>>
    /**
     * Nestable lists of class names compatible
     */
    type ClassNames =
      // example: "input input-button" or ""
      // example: { input: true, "input-button": true }
      | Value<{ [className: string]: boolean } | string[] | string | undefined | null | false>
      // example: { input: of(true), "input-button": true }
      | { [className: string]: Value<boolean> }

    type $ClassValue = ClassNames | ClassNames[]

    type AnyValue =
      | $ClassValue
      | $StyleValue
      | BooleanValue
      | DateValue
      | NumberValue
      | RefValue<any>
      | StringValue
      | ((this: DOMElement, event: any) => any)
      | null
      | undefined
  }
}
