import type { Observable, OperatorFunction, UnaryFunction } from "rxjs"
import { BehaviorSubject } from "rxjs"
import { map } from "rxjs/operators"

/** For use as an embedded structure */
export class BehaviorJSX extends BehaviorSubject<JSX.Child> {}
/** For use with $style attribute */
export class Behavior$Style extends BehaviorSubject<Partial<CSSStyleDeclaration>> {}
/** For use with $class attribute */
export class Behavior$Class extends BehaviorSubject<
  string | string[] | Record<string, any> | undefined | null | false
> {}

// /** Convenience map function implemented directly on the Observable class. */
// map<U>(fn: (from: T) => U): Observable<U>
/** Make it easier to map from an observable value to a `$style` prop value */
export function map$Style<T>(
  fn: (from: T) => Partial<CSSStyleDeclaration>,
): OperatorFunction<T, Partial<CSSStyleDeclaration>> {
  return map(fn)
}

/** Make it easier to map from an observable value to a `$class` prop value */
export function map$Class<T>(
  fn: (from: T) => { [className: string]: boolean } | string | undefined | null | false,
): OperatorFunction<T, { [className: string]: boolean } | string | undefined | null | false> {
  return map(fn)
}

/** Make it easier to map from an observable value to a JSX.Child */
export function mapJSX<T>(fn: (from: T) => JSX.Child): UnaryFunction<Observable<T>, JSX.Child> {
  return map(fn)
}
