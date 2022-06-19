import { Subscription } from "rxjs"
import { jsxSpec, renderElement } from "./"

function expectSpec(structure: JSX.Element) {
  return expect(renderElement(new Subscription(), structure))
}

describe("renderSpec special [is] attribute", () => {
  it("renders as common <intrinsic/> (div, a, h1, etc.)", () => {
    expectSpec(<div is="a"></div>) //
      .toMatchInlineSnapshot(`<a />`)

    expectSpec(<div is="video"></div>) //
      .toMatchInlineSnapshot(`<video />`)

    expectSpec(<div is="h1"></div>) //
      .toMatchInlineSnapshot(`<h1 />`)

    expectSpec(<div is="html"></div>) //
      .toMatchInlineSnapshot(`<html />`)

    expectSpec(<div is="body"></div>) //
      .toMatchInlineSnapshot(`<body />`)
  })
  it("renders with [is] specific attributes", () => {
    // @ts-expect-error href isn't for div, but will apply for <a/>
    expectSpec(<div is="a" href="link"></div>).toMatchInlineSnapshot(
      `
      <a
        href="link"
      />
    `,
    )
    // @ts-expect-error fill isn't for div, but will apply for <g/> (svg element)
    expectSpec(<div is="g" fill="white"></div>).toMatchInlineSnapshot(
      `
      <g
        fill="white"
      />
    `,
    )
  })
  it("renders as different <custom-element/>", () => {
    expectSpec(<div is="custom-element"></div>) //
      .toMatchInlineSnapshot(`<custom-element />`)
  })
})
