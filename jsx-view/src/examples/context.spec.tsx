import { BehaviorSubject, Subscription } from "rxjs"
import { jsxSpec, renderSpec, useContext, createContext, addContext } from ".."

function expectSpec(structure: JSX.Element) {
  return expect(renderSpec(new Subscription(), structure))
}

describe("context stuff", () => {
  it("can get context default", () => {
    expectSpec(<ContextTextLabel />).toMatchInlineSnapshot(`
<label>
  Default
</label>
`)
  })

  it("can get context supplied", () => {
    function ProvideText(props: { text: string }) {
      addContext(contextText, props.text)
      return <ContextTextLabel />
    }

    expectSpec(<ProvideText text="Hello" />).toMatchInlineSnapshot(`
<label>
  Hello
</label>
`)
  })

  it("can show different contexts depending on tree", () => {
    function ProvideText(props: { text: string }) {
      addContext(contextText, props.text)
      return <ContextTextLabel />
    }

    expectSpec(
      <div>
        <ProvideText text="Hello" />
        <ProvideText text="Goodbye" />
      </div>,
    ).toMatchInlineSnapshot(`
<div>
  <label>
    Hello
  </label>
  <label>
    Goodbye
  </label>
</div>
`)
  })

  it("can maintain correct context after re-renders", () => {
    function ProvideText(props: { text: string }, children: JSX.Child[]) {
      addContext(contextText, props.text)
      return <div>{children}</div>
    }

    const $1 = new BehaviorSubject<JSX.Child>(null)
    const $2 = new BehaviorSubject<JSX.Child>(null)

    $1.next(<ContextTextLabel />)
    $2.next(<ContextTextLabel />)

    expectSpec(
      <div>
        <ProvideText text="Hello">{$1}</ProvideText>
        <ProvideText text="Goodbye">{$2}</ProvideText>
      </div>,
    ).toMatchInlineSnapshot(`
<div>
  <div>
    <label>
      Hello
    </label>
  </div>
  <div>
    <label>
      Goodbye
    </label>
  </div>
</div>
`)
  })
})

const contextText = createContext("Default")

function ContextTextLabel(props: {}) {
  const text = useContext(contextText)
  return <label>{text}</label>
}
