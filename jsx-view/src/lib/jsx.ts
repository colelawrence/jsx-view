import type { Observable } from "rxjs"
import { combineLatest, of } from "rxjs"
import { map } from "rxjs/operators"
import { isObservableUnchecked } from "./isObservableUnchecked"
import { JVIntrinsic, JVFunction } from "./JVMounting"

declare global {
  namespace JSX {
    // Element has to be its own type in order to support flattening a problem child like: ["Hello", ["div", "World"]] in JSX
    type Element = JVElement
    /** Child type for specifying functions that return a child element */
    type Child = undefined | null | false | string | number | Node | JSX.Element | Observable<Child>
  }
}

// hmm
type WithChildren<P extends {}> = P & { children: JSX.Child | Array<JSX.Child> }

/**
 * Something React does to protect against XSS attacks, where JSON from a server
 * might be attempted to be used to directly renderDOM.
 */
export const sym_element = Symbol.for("jsx-view/element")

export type JVFC = (attrs: AnyAttrs) => JSX.Element | JSX.Element[]

// reconciliation
// 1. type change -> full rebuild
export interface JVElement {
  $$typeof: typeof sym_element
  type: string | JVFC
  // key: null | string | number
  // ref: null | ...
  props: AnyAttrs
}

// hmm
// export class ExoticSpec extends JVElement {
//   constructor(public readonly options: { addToContext?: { c: Context<any>; v: any }[]; children: JSX.Element[] }) {
//     super()
//   }
// }

/** Just a simple type helper, to keep things straight */
export type AnyAttrs = {
  children?: Array<JSX.Child>
  [prop: string]: any
}

// interface designed to be directly used via _jsx and
// JSX transform https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
export function jsx(
  type: string | JVFC,
  props: AnyAttrs,
  // // JSX TypeScript allows all sorts of interpolatable info as expressions including numbers by default
  // // I'm not sure if it's possible to overwrite what is allowed to be in these expressions, so we have
  // // to fix the children before passing along to `renderSpec`.
  // ...children: JSX.Child[]
): JSX.Element {
  return {
    $$typeof: sym_element,
    props,
    type,
  }
  // if (typeof elemName === "string") return new JVIntrinsic(elemName, props)
  // else return new JVFunction(elemName, props)
}

export function jsxCombineValues<T>(
  values: (JSX.Value<T> | undefined)[],
  merge: (values: (T | undefined)[]) => T,
): JSX.Value<T> | undefined {
  return combineLatest(values.map((a) => (isObservableUnchecked<T>(a) ? a : of(a as T | undefined)))).pipe(map(merge))
}

// function flattenChildren(children: JSX.Child[]): JSX.Element[] {
//   return flatMap(children, (a) => {
//     if (a == null) return []
//     if (a instanceof DOMSpecElement) return a
//     if (typeof a === "string") {
//       return new DOMSpecElement(a)
//     } else if (Array.isArray(a)) {
//       return flattenChildren(a)
//     } else {
//       return new DOMSpecElement(typeof a === "number" ? String(a) : a)
//     }
//   })
// }

// function flatMap<T, R>(items: T[], lambda: (item: T) => R | R[]): R[] {
//   return Array.prototype.concat.apply([], items.map(lambda))
// }
