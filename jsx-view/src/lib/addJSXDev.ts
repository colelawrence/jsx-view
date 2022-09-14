import type { Subscription } from "rxjs"
import { createContext } from "./Context"
import { addContext, ContextAccessError } from "./renderSpec"

/** Populated via `jsxDev` transpiler */
export interface JSXDevInfo {
  /** `this` value in the context the component was created */
  self?: unknown
  source?:
    | undefined
    | {
        fileName: string
        lineNumber: number
        columnNumber: number
      }
}

export interface JSXViewDevInfo extends JSXDevInfo, JSXViewDevRenderInfo {}

export interface JSXViewDevRenderInfo {
  /** direct parent component */
  directParentComponent?: undefined | JSX.ComponentFunction<Record<PropertyKey, unknown>>
  directParentComponentProps?: undefined | Record<PropertyKey, unknown>
  parentComponent?: undefined | JSX.ComponentFunction<Record<PropertyKey, unknown>>
  parentComponentProps?: undefined | Record<PropertyKey, unknown>
  intrinsicProps?: undefined | Record<PropertyKey, unknown>
}

export type JSXViewDevFunction = (element: Element, devInfo: JSXViewDevInfo, whileMountedSub: Subscription) => void

/** @internal */
export const _devctx = createContext<JSXViewDevFunction | null>(null)
export const _devctxglobal: [JSXViewDevFunction | null] = [null]

/**
 * Do something to every element given their dev information.
 *
 * @remarks
 * **Experimental**, please share feedback!
 */
export function addJSXDev(fn: JSXViewDevFunction | null) {
  try {
    addContext(_devctx, fn)
  } catch (err) {
    if (err instanceof ContextAccessError) {
      _devctxglobal[0] = fn
    } else {
      console.error(err)
    }
  }
}
