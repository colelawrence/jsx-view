import { renderSpec } from "jsx-view"
import { BehaviorSubject, Subscription } from "rxjs"
import { map } from "rxjs/operators"

console.log("playground/index.tsx")

const rootSub = new Subscription()
const $state$ = new BehaviorSubject(0)
const elt = renderSpec(
  rootSub,
  <article>
    <h1>Hello world</h1>
    <span style="font-size: 2em">{$state$.pipe(map((a) => `${a} thing${a === 1 ? "" : "s"}`))}</span>
    <br />
    <button onclick={() => $state$.next($state$.getValue() - 1)}>-</button>
    <button onclick={() => $state$.next($state$.getValue() + 1)}>+</button>
  </article>,
)

document.body.appendChild(elt)
