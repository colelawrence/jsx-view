import { BehaviorSubject, Subscription } from "rxjs"
import { jsxSpec, renderSpec } from "./"

function expectSpec(structure: JSX.Element) {
  return expect(renderSpec(new Subscription(), structure))
}

describe("static rendering", () => {
  it("renders div", () => {
    expectSpec(<div />).toMatchInlineSnapshot(`<div />`)
  })

  it("renders nested intrinsic elements", () => {
    expectSpec(
      <div>
        <span>toto</span>
      </div>,
    ).toMatchInlineSnapshot(`
      <div>
        <span>
          toto
        </span>
      </div>
    `)
  })

  it("renders custom component", () => {
    expectSpec(<ComponentA label="What's up?">Hello {12}</ComponentA>).toMatchInlineSnapshot(`
      <label>
        What's up?
        <small>
          All children: 
          Hello 
          12
        </small>
      </label>
    `)
  })
  it("renders div with behavior", () => {
    const $label = new BehaviorSubject("Hello")
    const expectDom = expectSpec(<div style={$label}>{$label}</div>)
    expectDom.toMatchInlineSnapshot(`
      <div
        style="Hello"
      >
        <render-observable>
          Hello
        </render-observable>
      </div>
    `)

    $label.next("Hello, Steve!")

    expectDom.toMatchInlineSnapshot(`
      <div
        style="Hello, Steve!"
      >
        <render-observable>
          Hello, Steve!
        </render-observable>
      </div>
    `)
  })

  it("renders div with children", () => {
    expectSpec(
      <div>
        <div />
        <div />
      </div>,
    ).toMatchInlineSnapshot(`
      <div>
        <div />
        <div />
      </div>
    `)
  })

  it("renders div with style", () => {
    expectSpec(<div style="color: blue" />).toMatchInlineSnapshot(`
      <div
        style="color: blue"
      />
    `)
  })
})

function ComponentA(props: { label: string }, children: JSX.Element[]) {
  return (
    <label>
      {props.label}
      <small>All children: {...children}</small>
    </label>
  )
}
