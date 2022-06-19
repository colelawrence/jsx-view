import type { Observable } from "rxjs"

export type DOMOutputSpec = JSX.Child | Observable<DOMOutputSpec>
