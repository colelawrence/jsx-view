import type { Observable } from "rxjs"
import { combineLatest, of } from "rxjs"
import { map } from "rxjs/operators"
import type { DOMOutputSpec } from "./DOMOutputSpec"
import { isObservableUnchecked } from "./isObservableUnchecked"

declare global {
  namespace JSX {
    // Element has to be its own type in order to support flattening a problem child like: ["Hello", ["div", "World"]] in JSX
    type Element = DOMSpecElement
    /** Child type for specifying functions that return a child element */
    type Child = undefined | null | false | string | number | Node | JSX.Element | Observable<Child>
  }
}

export class DOMSpecElement {
  constructor(public readonly spec: DOMOutputSpec) {}
}

export function jsxSpec(
  elemName: string | ((props: any, children: JSX.Element[]) => JSX.Element),
  props: Record<string, string> | null,
  // JSX TypeScript allows all sorts of interpolatable info as expressions including numbers by default
  // I'm not sure if it's possible to overwrite what is allowed to be in these expressions, so we have
  // to fix the children before passing along to `renderSpec`.
  ...children: JSX.Child[]
): JSX.Element {
  const fixChildren: JSX.Element[] = flattenChildren(...children)
  if (typeof elemName === "string") return new DOMSpecElement([elemName, props, ...fixChildren])
  else return elemName(props ?? {}, fixChildren) as any
}

export function jsxCombineValues<T>(
  values: (JSX.Value<T> | undefined)[],
  merge: (values: (T | undefined)[]) => T,
): JSX.Value<T> | undefined {
  return combineLatest(values.map((a) => (isObservableUnchecked<T>(a) ? a : of(a as T | undefined)))).pipe(map(merge))
}

function flattenChildren(...children: JSX.Child[]): JSX.Element[] {
  return flatMap(Array.from(children), (a) => {
    if (a == null) return []
    if (a instanceof DOMSpecElement) return a
    if (typeof a === "string") {
      return new DOMSpecElement(a)
    } else if (Array.isArray(a)) {
      return flattenChildren(...a)
    } else {
      return new DOMSpecElement(typeof a === "number" ? String(a) : a)
    }
  })
}

function flatMap<T, R>(items: T[], lambda: (item: T) => R | R[]): R[] {
  return Array.prototype.concat.apply([], items.map(lambda))
}
