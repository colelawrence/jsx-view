import { jsxSpec, renderElement } from "jsx-view"
import { Subscription } from "rxjs"

console.log("playground/index.tsx")

const rootSub = new Subscription()
const elt = renderElement(rootSub, <h1>Hello world</h1>)

document.body.appendChild(elt)
