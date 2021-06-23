import { isObservable, Subscription } from "rxjs"
import { distinctUntilChanged } from "rxjs/operators"
import { DOMOutputSpec } from "./DOMOutputSpec"
import { DOMSpecElement } from "./jsxSpec"
import { map$Class } from "./rxjs-helpers"
import { subscribeState } from "./subscribeState"
import { isObservableUnchecked } from "./isObservableUnchecked"

export function renderSpec(parentSub: Subscription, structure: DOMOutputSpec): HTMLElement {
  // must wrap top-level observable in an element, or the HTMLElement returned will not update
  // if it's detached from the DOM (which is very confusing)
  if (isObservable(structure)) throw new Error("Cannot render an observable root")
  // DOMOutputSpec must result in an HTMLElement
  return renderSpecDoc(document, parentSub, structure) as HTMLElement
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
  xmlNS: string | null = null,
): Node | Text {
  if (structure instanceof DOMSpecElement) structure = structure.spec
  if (typeof structure === "string") return doc.createTextNode(structure)
  if (structure == null || structure === false) return doc.createTextNode("")
  if (isObservableUnchecked<DOMOutputSpec>(structure)) {
    let obsNode: HTMLElement = doc.createElement("render-observable") // temporary until the first is rendered
    subscribeState(parentSub, structure, (spec, whileSpec) => {
      const oldNode = obsNode
      obsNode = renderSpecDoc(
        doc,
        whileSpec,
        spec == null || spec === false
          ? createEmptyNode(document)
          : spec instanceof DOMSpecElement || Array.isArray(spec)
          ? // will have a valid HTMLElement container
            (spec as DOMOutputSpec)
          : // might not have a container
            ["render-observable", null, spec],
      ) as HTMLElement
      oldNode.replaceWith(obsNode)
    })

    return obsNode
  }
  if (structure["nodeType"] != null) return structure as Node
  let tagName = structure[0]
  if (tagName.indexOf(" ") > 0) {
    throw new RangeError(`Unexpected space in tagName ("${tagName}")`)
  }
  const attrs = structure[1]
  let ref: ((self: HTMLElement, sub: Subscription) => any) | undefined = undefined
  let classAttrHandled = false

  tagName = attrs?.is ?? tagName
  if (tagName === "svg") xmlNS = "http://www.w3.org/2000/svg"
  const dom = (xmlNS ? doc.createElementNS(xmlNS, tagName) : doc.createElement(tagName)) as HTMLElement
  if (attrs != null) {
    for (let name in attrs) {
      if (name === "is") continue // handled above
      const attrVal = attrs[name]
      if (attrVal != null) {
        if (name === "$class" || name === "class" || name === "tags") {
          if (classAttrHandled) continue // already performed
          classAttrHandled = true
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
                Object.assign(dom.style, value)
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
          // Storyscript specific change to enable event listeners and boolean props
          if (isDirectAssignProp(name)) {
            dom[name] = attrVal
          } else if (name === "ref") {
            ref = attrVal
          } else if (name === "$style") {
            Object.assign(dom.style, attrVal)
          } else dom.setAttribute(name, attrVal)
        }
      }
    }
  }
  // @ts-ignore
  for (let i = 2; i < structure.length; i++) {
    let child = structure[i]
    const inner = renderSpecDoc(doc, parentSub, child, xmlNS)
    dom.appendChild(inner)
  }
  // call ref after the inner contents are created
  ref?.(dom, parentSub)
  return dom
}

function createEmptyNode(document: Document): HTMLElement {
  return document.createElement("render-empty")
}

function mapTagsToClassNames(tags: string[] | undefined): string {
  return (tags ?? []).map((tag) => `tag-${tag}`).join(" ")
}
