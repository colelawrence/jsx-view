import { isObservable } from "rxjs"
import type { Observable } from "rxjs"

export function isObservableUnchecked<T>(x: any): x is Observable<T> {
  return isObservable(x)
}
