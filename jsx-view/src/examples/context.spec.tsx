import { BehaviorSubject, Subscription } from "rxjs"
import { renderSpec, useContext, createContext, addContext } from ".."

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

  it("prevents context access outside of component render", () => {
    expect(() => useContext(contextText)).toThrowError("Cannot useContext")
  })

  it("prevents context adding outside of component render", () => {
    expect(() => addContext(contextText, "Yo yo")).toThrowError("Cannot addContext")
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

  it("maintains correct context after multiple adds", () => {
    function ProvideTextBanged(props: { text: string }, children: JSX.Child[]) {
      addContext(contextText, props.text)
      addContext(contextText, props.text + "!")
      addContext(contextText, props.text + "!!")
      return <div class="provide-text">{children}</div>
    }

    const $1 = new BehaviorSubject<JSX.Child>(null)
    expectSpec(<ProvideTextBanged text="Hello">{$1}</ProvideTextBanged>).toMatchInlineSnapshot(`
<div
  class="provide-text"
>
  <jsx-view-empty />
</div>
`)
    $1.next(<ContextTextLabel />)
    expectSpec(<ProvideTextBanged text="Hello">{$1}</ProvideTextBanged>).toMatchInlineSnapshot(`
<div
  class="provide-text"
>
  <label>
    Hello!!
  </label>
</div>
`)
  })

  it("can extend context", () => {
    function AddText(props: { append: string }, children: JSX.Child[]) {
      const current = useContext(contextText)
      addContext(contextText, current + " " + props.append)
      return <div class="append-text">{children}</div>
    }

    function ProvideText(props: { text: string }, children: JSX.Child[]) {
      addContext(contextText, props.text)
      return <div class="provide-text">{children}</div>
    }

    const $1 = new BehaviorSubject<JSX.Child>(null)
    const elt = (
      <ProvideText text="Hello">
        <AddText append="Append">{$1}</AddText>
      </ProvideText>
    )
    expectSpec(elt).toMatchInlineSnapshot(`
<div
  class="provide-text"
>
  <div
    class="append-text"
  >
    <jsx-view-empty />
  </div>
</div>
`)
    $1.next(<ContextTextLabel />)

    expectSpec(elt).toMatchInlineSnapshot(`
<div
  class="provide-text"
>
  <div
    class="append-text"
  >
    <label>
      Hello Append
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
