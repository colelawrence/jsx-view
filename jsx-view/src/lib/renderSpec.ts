import { isObservable, Observer, Subscription } from "rxjs"
import { distinctUntilChanged } from "rxjs/operators"
import { DOMOutputSpec } from "./DOMOutputSpec"
import { DOMSpecElement, __isDOMSpecElement } from "./jsxSpec"
import { map$Class } from "./rxjs-helpers"
import { subscribeState } from "./subscribeState"
import { isObservableUnchecked } from "./isObservableUnchecked"
import { St } from "./stack"
import { Context } from "./Context"

export function renderSpec(parentSub: Subscription, structure: DOMOutputSpec): Element {
  // must wrap top-level observable in an element, or the Element returned will not update
  // if it's detached from the DOM (which is very confusing)
  if (isObservable(structure)) throw new Error("Cannot render an observable root")
  // DOMOutputSpec must result in an Element
  return renderSpecDoc(document, parentSub, structure) as Element
}

type CtxScope = StackItem<unknown>[]

const globalContextStack = new St<CtxScope, 0 | 1 | 2>(0)
type StackItem<T> = Readonly<{
  /** key */
  c: Context<T>
  /** value */
  v: T
}>

/**
 * Pull a context from the current render function's execution frame.
 *
 * @example
 * import {createContext, useContext} from "jsx-view"
 *
 * const themeContext = createContext({
 *   textColor: "cornflowerblue"
 * })
 *
 * function MyComponent(props, children) {
 *   const theme = useContext(themeContext)
 *   return <p style={`color: ${theme.textColor}`}>
 *     Styled text
 *   </p>
 * }
 */
export function useContext<T>(context: Context<T>): T {
  if (globalContextStack.s < 1) throw new ContextAccessError("useContext")
  const curr = globalContextStack.get()
  for (let i = curr.length - 1; i >= 0; i--) {
    if (curr[i].c === context) return curr[i].v as T
  }
  return context.defaultValue
}

/**
 * Add a value for the context to the current render scope which will be passed down to child dom components.
 *
 * @example
 * import {createContext, useContext, addContext} from "jsx-view"
 *
 * const themeContext = createContext({
 *   textColor: "cornflowerblue"
 * })
 *
 * function MyParent(props, children) {
 *   const theme = useContext(themeContext) // pull default / parent provided context
 *
 *   addContext(themeContext, {...theme, textColor: "dodgerblue"}) // Makes MyComponent style with dodgerblue
 *
 *   return <p style={`color: ${theme.textColor}`}>
 *     Styled cornflowerblue
 *     <MyComponent/>
 *   </p>
 * }
 *
 * function MyComponent(props, children) {
 *   const theme = useContext(themeContext)
 *   return <p style={`color: ${theme.textColor}`}>
 *     Styled dodgerblue
 *   </p>
 * }
 */
export function addContext<T>(context: Context<T>, value: T): T {
  if (globalContextStack.s < 2) throw new ContextAccessError("addContext")
  globalContextStack.get().push({ c: context, v: value })
  return value
}

export class ContextAccessError extends Error {
  constructor(intent: string) {
    super(`Cannot ${intent} outside of a jsx component's function call frame.`)
  }
}

/** Examples: `<input disabled/>`, `<script defer .../>`, etc. */
const booleanProps = new Set([
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "draggable",
  "hidden",
  "loop",
  "multiple",
  "novalidate",
  "open",
  "readonly",
  "required",
  "reversed",
  "scoped",
  "selected",
  "spellcheck",
  "wrap",
])

/**
 * Props that must have their values assigned like `elt[prop] = value` (as opposed to `elt.setAttribute(prop, value)`).
 */
function isDirectAssignProp(prop: string): boolean {
  return (
    // According to the HTML spec, all attributes starting with "on" are event listeners (accepting assignment to functions)
    prop.startsWith("on") ||
    // boolean brops show up like `<input disabled/>` where there isn't an actual value needed
    booleanProps.has(prop) ||
    // "value" must be directly assigned to notify HTMLInputElement of change
    prop === "value"
  )
}

/**
 * :: (dom.Document, DOMOutputSpec) → {dom: dom.Node, subscription: rxjs.Subscription}
 * Render an [output spec](#model.DOMOutputSpec) to a DOM node.
 *
 * * **Modified to work with event listeners see `else if (name.startsWith("on"))`**
 * * **Modified to work with observables on attribute setters see `else if (name.startsWith("on"))`**
 * * **Modified to work with `ref` attributes**
 */
function renderSpecDoc(
  doc: Document,
  parentSub: Subscription,
  structure: DOMOutputSpec,
  scope: CtxScope = [],
  xmlNS: string | null = null,
): Node | Text {
  if (__isDOMSpecElement(structure)) structure = structure.spec
  if (typeof structure === "string") return doc.createTextNode(structure)
  if (structure == null || structure === false) return doc.createTextNode("")
  if (isObservableUnchecked<DOMOutputSpec>(structure)) {
    let obsNode: Element = doc.createElement("jsx-view-observable") // temporary until the first is rendered
    subscribeState(parentSub, structure, (spec, whileSpec) => {
      const oldNode = obsNode
      obsNode = renderSpecDoc(
        doc,
        whileSpec,
        spec == null || spec === false
          ? createEmptyNode(doc)
          : __isDOMSpecElement(spec) || Array.isArray(spec)
          ? // will have a valid Element container
            (spec as DOMOutputSpec)
          : // might not have a container
            ["jsx-view-observable", null, spec],
        scope,
        xmlNS,
      ) as Element
      oldNode.replaceWith(obsNode)
    })

    return obsNode
  }
  if (structure["nodeType"] != null) return structure as Node
  let tagName = structure[0]
  if (typeof tagName === "function") {
    scope = scope.slice(0) // clone scope so it can be pushed to
    globalContextStack.push(scope)
    globalContextStack.s = 2
    structure = tagName(structure[1], (structure as unknown as any[]).slice(2))
    const res = renderSpecDoc(
      doc,
      parentSub,
      // Hmm: Do we need to check if it has a proper container like with the observable one above?
      structure,
      scope,
      xmlNS,
    ) as Element
    globalContextStack.pop()
    globalContextStack.s = 0
    return res
  }

  if (tagName.indexOf(" ") > 0) {
    throw new RangeError(`Unexpected space in tagName ("${tagName}")`)
  }
  const attrs = structure[1]
  let ref: JSX.RefValue | undefined = undefined
  let classAttrHandled: 0 | 1 = 0

  tagName = attrs?.is ?? tagName
  if (tagName === "svg") xmlNS = "http://www.w3.org/2000/svg"
  const dom = (xmlNS ? doc.createElementNS(xmlNS, tagName) : doc.createElement(tagName)) as Element
  if (attrs != null) {
    for (let name in attrs) {
      if (name === "is") continue // handled above
      const attrVal = attrs[name]
      if (attrVal != null) {
        if (name === "$class" || name === "class" || name === "tags") {
          if (classAttrHandled) continue // already performed
          classAttrHandled = 1
          const classNamesList: JSX.ClassNames[] = attrs.class ? [attrs.class] : [] // works because `attrs.class` is `StringValue`
          const val$classes = attrs.$class as JSX.$ClassValue | undefined
          if (Array.isArray(val$classes)) {
            classNamesList.push(...val$classes)
          } else if (val$classes != null) {
            classNamesList.push(val$classes)
          }
          const valClass = attrs.class as JSX.StringValue | undefined
          if (valClass != null) {
            classNamesList.push(valClass)
          }
          const valTag = attrs.tags as JSX.Value<string[]> | undefined
          if (valTag != null) {
            classNamesList.push(
              isObservableUnchecked<string[] | undefined>(valTag)
                ? valTag.pipe(map$Class(mapTagsToClassNames))
                : mapTagsToClassNames(valTag),
            )
          }
          for (let i = 0; i < classNamesList.length; i++) {
            const classItem = classNamesList[i]
            if (isObservableUnchecked<string | string[] | Record<string, any> | undefined | null | false>(classItem)) {
              let previousClasses: string[] = []
              parentSub.add(
                classItem.subscribe((a) => {
                  dom.classList.remove(...previousClasses)
                  if (!a) {
                    // skip
                    previousClasses = []
                  } else if (typeof a === "string") previousClasses = a.split(/\s+/g).filter(Boolean)
                  else if (Array.isArray(a)) previousClasses = a.filter(Boolean)
                  else {
                    previousClasses = []
                    for (const className in a) {
                      // just check if truthy
                      if (a[className]) {
                        previousClasses.push(className)
                      }
                    }
                  }
                  dom.classList.add(...previousClasses)
                }),
              )
            } else {
              let classesToAdd: string[] = []
              if (!classItem) {
                // skip
              } else if (typeof classItem === "string") classesToAdd = classItem.split(/\s+/g).filter(Boolean)
              else {
                for (const className in classItem) {
                  const classVal = classItem[className]
                  // just check if truthy
                  if (classVal) {
                    if (isObservableUnchecked<boolean | undefined | null>(classVal)) {
                      parentSub.add(
                        classVal.pipe(distinctUntilChanged()).subscribe((shouldAdd) => {
                          dom.classList.toggle(className, !!shouldAdd)
                        }),
                      )
                    } else {
                      classesToAdd.push(className)
                    }
                  }
                }
              }
              dom.classList.add(...classesToAdd)
            }
          }
        } else if (isObservable(attrVal)) {
          if (name === "$style") {
            if (isObservable(attrs.style))
              throw new RangeError("Cannot combine $style property with an Observable [style] property.")
            parentSub.add(
              attrVal.subscribe((value) => {
                for (const key in value as any) {
                  ;(dom as HTMLElement).style[key] = (value as any)[key]
                }
              }),
            )
          } else if (isDirectAssignProp(name)) {
            parentSub.add(
              attrVal.subscribe((value) => {
                if (dom[name] !== value) dom[name] = value
              }),
            )
          } else
            parentSub.add(
              attrVal.subscribe((value) => {
                if (value == null) dom.removeAttribute(name)
                else dom.setAttribute(name, String(value))
              }),
            )
        } else {
          // enable event listeners and boolean props
          if (isDirectAssignProp(name)) {
            dom[name] = attrVal
          } else if (name === "ref") {
            ref = attrVal
          } else if (name === "$style") {
            for (const key in attrVal as any) {
              ;(dom as HTMLElement).style[key] = (attrVal as any)[key]
            }
          } else dom.setAttribute(name, attrVal)
        }
      }
    }
  }

  // render children
  // @ts-ignore
  for (let i = 2; i < structure.length; i++) {
    let child = structure[i]
    const inner = renderSpecDoc(doc, parentSub, child, scope, xmlNS)
    dom.appendChild(inner)
  }

  if (ref) {
    globalContextStack.push(scope)
    globalContextStack.s = 1
    if (typeof ref === "function") {
      // call ref after the inner contents are created
      ref(dom, parentSub)
    } else {
      ref.next({ dom, sub: parentSub })
    }
    globalContextStack.pop()
    globalContextStack.s = 0
  }
  return dom
}

function createEmptyNode(document: Document): Element {
  return document.createElement("jsx-view-empty")
}

function mapTagsToClassNames(tags: string[] | undefined): string {
  return (tags ?? []).map((tag) => `tag-${tag}`).join(" ")
}
