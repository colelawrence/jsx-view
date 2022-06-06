import { createContext, useContext, jsxSpec, renderSpec } from ".."
import { DOMOutputSpec } from "../lib/DOMOutputSpec"
import { Subscription } from "rxjs"

describe("jsx-view context", () => {
  it("uses context default value", () => {
    const context = createContext(1)
    expectComponent({}, function UseDefault(props: {}) {
      const value = useContext(context)
      return <span>{value}</span>
    }).toMatchInlineSnapshot(`
      <span>
        1
      </span>
    `)
  })
  it("uses context provided value", () => {
    const context = createContext(1)
    expectSpec(
      <div>
        <Use />
        <context.Provider value={20}>
          <Use />
        </context.Provider>
      </div>,
    ).toMatchInlineSnapshot(`
    <div>
      <span>
        1
      </span>
      <jsx-provider>
        <span>
          20
        </span>
      </jsx-provider>
    </div>
    `)

    function Use(props: {}) {
      return <span>{useContext(context)}</span>
    }
  })
})

function expectComponent<P extends {}>(props: P, component: (props: P, children: any[]) => JSX.Element) {
  return expect(renderSpec(new Subscription(), jsxSpec(component, props)))
}
function expectSpec(structure: DOMOutputSpec) {
  return expect(renderSpec(new Subscription(), structure))
}
