import { expect, it, describe } from "@jest/globals"
import { BehaviorSubject, Subscription } from "rxjs"
import { renderSpec } from "jsx-view"

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
        <jsx-view-observable>
          Hello
        </jsx-view-observable>
      </div>
    `)

    $label$.next("Hello, Steve!")

    expectDom.toMatchInlineSnapshot(`
      <div
        style="Hello, Steve!"
      >
        <jsx-view-observable>
          Hello, Steve!
        </jsx-view-observable>
      </div>
    `)
  })
  it("renders div with jsx behavior", () => {
    const $label$ = new BehaviorSubject<JSX.Child>("Hello")
    const expectDom = expectSpec(<div>{$label$}</div>)

    expectDom.toMatchInlineSnapshot(`
      <div>
        <jsx-view-observable>
          Hello
        </jsx-view-observable>
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
