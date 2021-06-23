import type { Observable } from "rxjs"

/** @internal */
interface DOMOutputSpecArray {
  0: string
  // type definition here is slightly awkward, because we can't quite get a full list of all props
  1?: JSX.AnyProps | null
  2?: DOMOutputSpec | 0
  3?: DOMOutputSpec | 0
  4?: DOMOutputSpec | 0
  5?: DOMOutputSpec | 0
  6?: DOMOutputSpec | 0
  7?: DOMOutputSpec | 0
  8?: DOMOutputSpec | 0
  9?: DOMOutputSpec | 0
}

export type DOMOutputSpec = JSX.Child | DOMOutputSpecArray | Observable<DOMOutputSpec>
