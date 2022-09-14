import { addJSXDev, renderSpec } from "jsx-view"
import { BehaviorSubject, Subscription } from "rxjs"
import { map } from "rxjs/operators"

console.log("playground/index.tsx")

const rootSub = new Subscription()
const $state$ = new BehaviorSubject(0)

const $inputValue$ = new BehaviorSubject("JSX View")

addJSXDev((element, info) => {
  ;(element as any).__jsxview = info
  const source = info.source
  if (source) {
    const prefix =
      typeof info.directParentComponent === "function" && info.directParentComponent.name
        ? `${info.directParentComponent.name} in `
        : ""
    const suffix =
      typeof info.parentComponent === "function" && info.parentComponent.name ? ` (${info.parentComponent.name})` : ""
    element.setAttribute(
      "jsx-source",
      `${prefix}${source.fileName}:${source.lineNumber}:${source.columnNumber}${suffix}`,
    )
  }
})

const elt = renderSpec(
  rootSub,
  <article>
    <h1>Hello world</h1>
    <span style="font-size: 2em">{$state$.pipe(map((a) => `${a} thing${a === 1 ? "" : "s"}`))}</span>
    <br />
    <button onclick={() => $state$.next($state$.getValue() - 1)}>-</button>
    <button onclick={() => $state$.next($state$.getValue() + 1)}>+</button>

    <section>
      <MyComponent
        // You can embed Observable<string> (or any Observable<JSX.Child>)
        // in between any tags
        title={
          <span>
            Hello <b>{$inputValue$}</b>
          </span>
        }
      >
        <label for="your-title">Title</label>
        <input
          id="your-title"
          value={$inputValue$}
          oninput={(evt) => $inputValue$.next((evt.target as HTMLInputElement).value)}
        />
      </MyComponent>
    </section>
  </article>,
)

function MyComponent(props: { title: JSX.Child; children: JSX.Children }) {
  return (
    <div>
      <h3>{props.title}</h3>
      {props.children}
    </div>
  )
}

document.body.appendChild(elt)
