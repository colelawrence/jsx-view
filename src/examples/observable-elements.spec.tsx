import { BehaviorSubject, Subscription } from "rxjs"
import { jsxSpec, renderSpec } from ".."

function expectSpec(structure: JSX.Element) {
  return expect(renderSpec(new Subscription(), structure))
}

describe("observable elements", () => {
  it("renders div with behavior", () => {
    const $label$ = new BehaviorSubject("Hello")
    const expectDom = expectSpec(<div style={$label$}>{$label$}</div>)

    expectDom.toMatchInlineSnapshot(`
      <div
        style="Hello"
      >
        <render-observable>
          Hello
        </render-observable>
      </div>
    `)

    $label$.next("Hello, Steve!")

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
  it("renders div with jsx behavior", () => {
    const $label$ = new BehaviorSubject<JSX.Child>("Hello")
    const expectDom = expectSpec(<div>{$label$}</div>)

    expectDom.toMatchInlineSnapshot(`
      <div>
        <render-observable>
          Hello
        </render-observable>
      </div>
    `)

    $label$.next(<label>Hello</label>)

    expectDom.toMatchInlineSnapshot(`
      <div>
        <label>
          Hello
        </label>
      </div>
    `)
  })
})
