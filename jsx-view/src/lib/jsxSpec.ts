import type { Observable } from "rxjs"
import { combineLatest, of } from "rxjs"
import { map } from "rxjs/operators"
import type { JSXDevInfo } from "./addJSXDev"
import type { DOMOutputSpec } from "./DOMOutputSpec"
import { isObservableUnchecked } from "./isObservableUnchecked"

declare global {
  namespace JSX {
    // Element has to be its own type in order to support flattening a problem child like: ["Hello", ["div", "World"]] in JSX
    type Element = DOMSpecElement
    /** Child type for specifying functions that return a child element */
    type Child = undefined | null | false | string | number | Node | JSX.Element | Observable<JSX.Child>

    // https://www.typescriptlang.org/docs/handbook/jsx.html#children-type-checking
    interface ElementChildrenAttribute {
      children: {} // specify children name to use
    }
  }
}

const DOMSpecElementMarker = Symbol.for("jsx-view/DOMSpecElement")

export class DOMSpecElement {
  public _dev?: JSXDevInfo
  constructor(public readonly spec: DOMOutputSpec) {}
  [DOMSpecElementMarker] = true
}

/** @internal */
export function __isDOMSpecElement(obj: any): obj is DOMSpecElement {
  // The !! is to ensure that this publicly exposed function returns
  // `false` if something like `null` or `0` is passed.
  return (!!obj && obj instanceof DOMSpecElement) || obj?.[DOMSpecElementMarker] === true
}

export function jsx(elemName: string | ((props: any) => JSX.Element), props: Record<string, any> | null): JSX.Element {
  if (typeof elemName === "string") {
    // intrinsic elements like <div/> or <p/>
    if (!props) props = {}
    const { children, ...givenProps } = props
    const fixChildren = flattenChildren(Array.isArray(children) ? children : [children])
    return new DOMSpecElement([elemName, givenProps, ...fixChildren])
  }

  // custom elements like <MyComponent/>
  return new DOMSpecElement([elemName, props])
}

export function jsxCombineValues<T>(
  values: (JSX.Value<T> | undefined)[],
  merge: (values: (T | undefined)[]) => T,
): JSX.Value<T> | undefined {
  return combineLatest(values.map((a) => (isObservableUnchecked<T>(a) ? a : of(a as T | undefined)))).pipe(map(merge))
}

export function flattenChildren(children: JSX.Children[]): JSX.Element[] {
  return flatMap(children, (a) => {
    if (a == null) return []
    if (a instanceof DOMSpecElement) return a
    if (typeof a === "string") {
      return new DOMSpecElement(a)
    } else if (Array.isArray(a)) {
      return flattenChildren(a)
    } else {
      return new DOMSpecElement(typeof a === "number" ? String(a) : a)
    }
  })
}

function flatMap<T, R>(items: T[], lambda: (item: T) => R | R[]): R[] {
  return Array.prototype.concat.apply([], items.map(lambda))
}
