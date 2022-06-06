import { BehaviorSubject, Observable, Subscription } from "rxjs"
import { map } from "rxjs/operators"
import { renderSpec } from "./"
import { DOMOutputSpec } from "./lib/DOMOutputSpec"
import { map$Class } from "./lib/rxjs-helpers"

function expectSpec(structure: DOMOutputSpec) {
  return expect(renderSpec(new Subscription(), structure))
}

describe("static rendering", () => {
  it("renders div", () => {
    expectSpec(["div"]).toMatchInlineSnapshot(`<div />`)
  })
  it("throws when tag has spaces inside", () => {
    expect(() => {
      expectSpec(["tag with space", null, "dummy content"])
    }).toThrow(new RangeError('Unexpected space in tagName ("tag with space")'))
  })
  it("renders div with children", () => {
    expectSpec(["div", null, ["div"], ["div"]]).toMatchInlineSnapshot(`
      <div>
        <div />
        <div />
      </div>
    `)
  })
  it("renders div with style", () => {
    expectSpec(["div", { style: "color: blue" }]).toMatchInlineSnapshot(`
      <div
        style="color: blue"
      />
    `)
  })
  it("renders div with style and children", () => {
    expectSpec([
      "div",
      { style: "color: blue" },
      ["h1", { style: "font-style: italics" }],
      ["p", { style: "line-height: 2" }],
    ]).toMatchInlineSnapshot(`
      <div
        style="color: blue"
      >
        <h1
          style="font-style: italics"
        />
        <p
          style="line-height: 2"
        />
      </div>
    `)
  })
  it("renders text nodes", () => {
    expectSpec([
      "div",
      { style: "color: blue" },
      ["h1", { style: "font-style: italics" }, "Heading 1"],
      "text node content",
    ]).toMatchInlineSnapshot(`
      <div
        style="color: blue"
      >
        <h1
          style="font-style: italics"
        >
          Heading 1
        </h1>
        text node content
      </div>
    `)
  })
  it("renders with event handlers", () => {
    const handled: MouseEvent[] = []

    const dom = renderSpec(new Subscription(), [
      "div",
      { style: "color: blue" },
      ["button", { onclick: (evt) => handled.push(evt) }, "Click me"],
    ])

    expect(dom).toMatchInlineSnapshot(`
      <div
        style="color: blue"
      >
        <button>
          Click me
        </button>
      </div>
    `)

    const button = dom.querySelector("button")!
    const evt = new MouseEvent("click", { bubbles: true, relatedTarget: button })

    expect(button.dispatchEvent(evt)).toBeTruthy()
    expect(handled).toHaveLength(1)
    expect(handled[0]).toEqual(evt)
  })
})

describe("rendering with observables", () => {
  class BehaviorSpec extends BehaviorSubject<DOMOutputSpec> {}
  it("renders div from observable", () => {
    const from = new BehaviorSpec(["div"])
    const expectDom = expectSpec(["section", null, from])
    expectDom.toMatchInlineSnapshot(`
      <section>
        <div />
      </section>
      `)
    from.next(["p"])
    expectDom.toMatchInlineSnapshot(`
      <section>
        <p />
      </section>
    `)
  })
  it("renders div with child observables", () => {
    const from = new BehaviorSpec(["p"])

    const expectDom = expectSpec(["div", null, from, ["br"], from])
    expectDom.toMatchInlineSnapshot(`
      <div>
        <p />
        <br />
        <p />
      </div>
    `)
    from.next(["h1"])
    expectDom.toMatchInlineSnapshot(`
      <div>
        <h1 />
        <br />
        <h1 />
      </div>
    `)
  })

  it("renders div with style observable", () => {
    const $style = new BehaviorSubject("color: blue")

    const expectDom = expectSpec(["div", { style: $style }])
    expectDom.toMatchInlineSnapshot(`
      <div
        style="color: blue"
      />
    `)
    $style.next("color: green")
    expectDom.toMatchInlineSnapshot(`
      <div
        style="color: green"
      />
    `)
  })
  it("renders div with style and children", () => {
    const $style = new BehaviorSubject("margin-left: 0px")
    const expectDom = expectSpec([
      "div",
      { style: $style },
      ["h1", { style: "font-style: italics" }],
      ["p", { style: $style }],
    ])
    expectDom.toMatchInlineSnapshot(`
      <div
        style="margin-left: 0px"
      >
        <h1
          style="font-style: italics"
        />
        <p
          style="margin-left: 0px"
        />
      </div>
    `)
    $style.next("margin-left: 10px")
    expectDom.toMatchInlineSnapshot(`
      <div
        style="margin-left: 10px"
      >
        <h1
          style="font-style: italics"
        />
        <p
          style="margin-left: 10px"
        />
      </div>
    `)
  })
  it("renders div with mapped attr", () => {
    const $style = new BehaviorSubject("margin-left: 0px")

    const expectDom = expectSpec([
      "div",
      { style: $style.pipe(map((style) => style + `; font-style: italics`)) },
      ["p", { style: $style }],
    ])
    expectDom.toMatchInlineSnapshot(`
      <div
        style="margin-left: 0px; font-style: italics"
      >
        <p
          style="margin-left: 0px"
        />
      </div>
    `)
    $style.next("margin-left: 10px")
    expectDom.toMatchInlineSnapshot(`
      <div
        style="margin-left: 10px; font-style: italics"
      >
        <p
          style="margin-left: 10px"
        />
      </div>
    `)
  })
  it("renders observable text nodes", () => {
    const from = new BehaviorSpec("text node content")
    const fromH1 = new BehaviorSpec("Heading 1")

    const expectDom = expectSpec([
      "div",
      { style: "color: blue" },
      ["h1", { style: "font-style: italics" }, fromH1],
      from,
    ])
    expectDom.toMatchInlineSnapshot(`
      <div
        style="color: blue"
      >
        <h1
          style="font-style: italics"
        >
          <render-observable>
            Heading 1
          </render-observable>
        </h1>
        <render-observable>
          text node content
        </render-observable>
      </div>
    `)
    from.next("updated text")
    expectDom.toMatchInlineSnapshot(`
      <div
        style="color: blue"
      >
        <h1
          style="font-style: italics"
        >
          <render-observable>
            Heading 1
          </render-observable>
        </h1>
        <render-observable>
          updated text
        </render-observable>
      </div>
    `)
    from.next(["b", null, "Swap text node with bold tag"])
    expectDom.toMatchInlineSnapshot(`
      <div
        style="color: blue"
      >
        <h1
          style="font-style: italics"
        >
          <render-observable>
            Heading 1
          </render-observable>
        </h1>
        <b>
          Swap text node with bold tag
        </b>
      </div>
    `)
  })
  it("renders with event handlers", () => {
    const handled: MouseEvent[] = []
    const button$ = new BehaviorSpec(["button", { onclick: (evt) => handled.push(evt) }, "Click me"])

    const dom = renderSpec(new Subscription(), ["div", { style: "color: blue" }, button$])
    expect(dom).toMatchInlineSnapshot(`
      <div
        style="color: blue"
      >
        <button>
          Click me
        </button>
      </div>
    `)

    {
      const button = dom.querySelector("button")!
      const evt = new MouseEvent("click", { bubbles: true, relatedTarget: button })

      expect(button.dispatchEvent(evt)).toBeTruthy()
      expect(handled).toHaveLength(1)
      expect(handled[0]).toEqual(evt)
    }

    {
      while (handled.pop()) {}

      expect(handled).toHaveLength(0)
      button$.next(["button", null, "Don't click me"])
      expect(dom).toMatchInlineSnapshot(`
        <div
          style="color: blue"
        >
          <button>
            Don't click me
          </button>
        </div>
      `)
      const button = dom.querySelector("button")!
      const evt = new MouseEvent("click", { bubbles: true, relatedTarget: button })
      expect(button.dispatchEvent(evt)).toBeTruthy()
      expect(handled).toHaveLength(0)
    }
  })

  it("unsubscribes nested observables", () => {
    const buttonStyle$ = new BehaviorSubject("color: blue")
    const button$ = new BehaviorSpec(["button", { style: buttonStyle$ }, "Click me"])

    const subscription = new Subscription()
    const expectButton = expect(renderSpec(subscription, ["section", null, button$]))
    expectButton.toMatchInlineSnapshot(`
      <section>
        <button
          style="color: blue"
        >
          Click me
        </button>
      </section>
    `)

    buttonStyle$.next("color: green")

    expectButton.toMatchInlineSnapshot(`
      <section>
        <button
          style="color: green"
        >
          Click me
        </button>
      </section>
    `)
    expect(buttonStyle$.observers).toHaveLength(1)

    button$.next(["button", null, "Don't click me"])
    expect(buttonStyle$.observers).toHaveLength(0)

    const labelNested$ = new BehaviorSpec(["label", { style: buttonStyle$ }, "Click me"])
    button$.next(["button", { style: buttonStyle$ }, labelNested$])
    expect(labelNested$.observers).toHaveLength(1)
    expect(buttonStyle$.observers).toHaveLength(2)

    button$.next("cleared")
    expect(labelNested$.observers).toHaveLength(0)
    expect(buttonStyle$.observers).toHaveLength(0)
    expectButton.toMatchInlineSnapshot(`
      <section>
        <render-observable>
          cleared
        </render-observable>
      </section>
    `)

    // unsubscribe should stop all further rendering changes to dom
    subscription.unsubscribe()
    button$.next(["button", { style: buttonStyle$ }, labelNested$])
    expect(labelNested$.observers).toHaveLength(0)
    expect(buttonStyle$.observers).toHaveLength(0)
    expectButton.toMatchInlineSnapshot(`
      <section>
        <render-observable>
          cleared
        </render-observable>
      </section>
    `)
  })
})

describe("rendering with observable $style", () => {
  class BehaviorStyle extends BehaviorSubject<Partial<CSSStyleDeclaration>> {}
  it("sets style properties through next values", () => {
    const from = new BehaviorStyle({ top: "2px" })

    const expectDom = expectSpec(["div", { $style: from }])
    expectDom.toMatchInlineSnapshot(`
      <div
        style="top: 2px;"
      />
    `)
    from.next({ top: "4px" })
    expectDom.toMatchInlineSnapshot(`
      <div
        style="top: 4px;"
      />
    `)
  })
  it("combines style and $style properties through next values", () => {
    const from = new BehaviorStyle({ top: "2px" })

    const expectDom = expectSpec(["div", { style: "bottom: 0px", $style: from }])
    expectDom.toMatchInlineSnapshot(`
      <div
        style="bottom: 0px; top: 2px;"
      />
    `)
    from.next({ top: "4px" })
    expectDom.toMatchInlineSnapshot(`
      <div
        style="bottom: 0px; top: 4px;"
      />
    `)
  })
  it("removes style properties by setting to empty string", () => {
    const from = new BehaviorStyle({ top: "2px" })

    const expectDom = expectSpec(["div", { style: "bottom: 0px", $style: from }])
    expectDom.toMatchInlineSnapshot(`
      <div
        style="bottom: 0px; top: 2px;"
      />
    `)
    from.next({ top: "" })
    expectDom.toMatchInlineSnapshot(`
      <div
        style="bottom: 0px;"
      />
    `)
    from.next({ bottom: "" })
    expectDom.toMatchInlineSnapshot(`
      <div
        style=""
      />
    `)
  })
  it("doesn't clear previous style properties that are missing from future next values", () => {
    const from = new BehaviorStyle({ top: "2px" })

    const expectDom = expectSpec(["div", { $style: from }])
    expectDom.toMatchInlineSnapshot(`
      <div
        style="top: 2px;"
      />
    `)
    from.next({})
    expectDom.toMatchInlineSnapshot(`
      <div
        style="top: 2px;"
      />
    `)
  })
  it("throws when both $style and style are Observables", () => {
    const from = new BehaviorStyle({ top: "2px" })

    expect(() => {
      renderSpec(new Subscription(), ["div", { $style: from, style: new BehaviorSubject("") }])
    }).toThrow(new RangeError("Cannot combine $style property with an Observable [style] property."))
  })
})

describe("rendering with observable class$", () => {
  it('manages $class and class to find "a b c" or "a b" as className based on observable', () => {
    // if includeC emits `true` make `class="a b c"`, if `false`, then `class="a b"`
    testABmaybeC((includeC) => [
      { class: "a b", $class: { c: includeC } },
      { class: "a b", $class: includeC.pipe(map$Class((c) => c && "c")) },
      { class: "a b", $class: [includeC.pipe(map$Class((c) => (c ? "c" : "")))] },
      { $class: ["a b", { c: includeC }] },
      { $class: ["a b", includeC.pipe(map$Class((c) => ({ c })))] },
      { $class: ["a b", includeC.pipe(map$Class((c) => c && "c"))] },
      { $class: includeC.pipe(map$Class((c) => `a b ${c ? "c" : ""}`)) },
    ])
  })

  function testABmaybeC(props: (includeC: Observable<boolean>) => JSX.AnyProps[]) {
    const includeC = new BehaviorSubject(true)
    const abcProps = props(includeC)
    const doms = abcProps.map((a, idx) => ({ idx, dom: renderSpec(new Subscription(), ["div", a]) }))
    for (const { dom, idx } of doms) {
      if (dom.className !== "a b c") {
        fail(`expected example ${idx} to include "c" as "a b c" classname; found ${JSON.stringify(dom.className)}`)
      }
    }
    includeC.next(false) // should remove class "c" from all examples
    for (const { dom, idx } of doms) {
      if (dom.className !== "a b") {
        fail(`expected example ${idx} to not include "c" as "a b" classname; found ${JSON.stringify(dom.className)}`)
      }
    }
  }
})
