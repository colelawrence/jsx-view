import type { JSXDevInfo } from "./addJSXDev"
import type { DOMOutputSpec } from "./DOMOutputSpec"
import { flattenChildren, DOMSpecElement } from "./jsxSpec"

export function jsxDEV(
  elemName: string | ((props: any) => JSX.Element),
  props: Record<string, any> | null,
  key: undefined,
  isStaticChildren: boolean,
  source: JSXDevInfo["source"],
  // `this`
  self: unknown,
) {
  const dev = { key, isStaticChildren, source, self }
  if (typeof elemName === "string") {
    // intrinsic elements like <div/> or <p/>
    if (!props) props = {}
    const { children, ...givenProps } = props
    const fixChildren = flattenChildren(Array.isArray(children) ? children : [children])
    return new DOMDevSpecElement([elemName, givenProps, ...fixChildren], dev)
  }

  // custom elements like <MyComponent/>
  return new DOMDevSpecElement([elemName, props], dev)
}

export class DOMDevSpecElement extends DOMSpecElement {
  constructor(public readonly spec: DOMOutputSpec, dev?: JSXDevInfo) {
    super(spec)
    if (dev != null) {
      this._dev = dev
    }
  }
}
