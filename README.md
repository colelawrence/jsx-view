<div align="center">
  <h1>jsx-view</h1>
  <h3>An MVVM / BLoC HTML DOM view library for RxJS</h3>
  <a href="https://github.com/colelawrence/jsx-view/blob/main/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/github/license/colelawrence/jsx-view" />
  </a>
  <a href="https://twitter.com/refactorordie">
    <img alt="Twitter" src="https://img.shields.io/twitter/url.svg?label=Follow%20%40refactorordie&style=social&url=https%3A%2F%2Ftwitter.com%2Frefactorordie" />
  </a>
  <br />
  <br />
  <figure>
    <img src="jsx-view.webp" style="max-height: 160px">
    <figcaption>
      <p align="center">
        Write your web ui with battle-tested <a href="https://rxjs.dev">RxJS</a> for granular updates.
      </p>
    </figcaption>
  </figure>
</div>

> This is one of my favorite libraries, and I use it for several projects I maintain, including some work from [storyai](https://www.colelawrence.com/storyai) and a new product I'm actively working on.
> If you like what you see here, please reach out to me at cole @ [github user name] .com and I'd be happy to answer questions.

**Great for:**

- Business Logic Components [BLoC]
- Model-View-ViewModel [MVVM]

**Features**

- No DOM diffing and no "lifecycle loop". Only Observables which get subscribed to and [directly update the DOM elements](src/examples/observable-elements.spec.tsx).
- Minimal JSX wiring up with full type definitions for all common `HTMLElement` attributes.
- Any attribute accepts an Observable of its value, and this is type checked.
- An Observable of any [`JSX.Child`](src/lib/jsxSpec.ts) (`string`, `null`, `JSX.Element`, etc), can be used as a `JSX.Child`.
- Adds [special props](src/lib/declare/declare-special-props.ts): `is`, `$style`, `$class`, `ref`, and `tags`.
- exports declaration maps (go-to-def goes to TypeScript source code)

## Todo App example

> This was adapted from [a similar demo I put together with React + RxJS](https://refactorordie.com/storybook/?path=/story/writing-observable-state-presentations--react-nyc-oct-2019-todo-app), so if tehre's something missing or misspelled, please accept my apologies.

```tsx
// TodoView.tsx
import { useContext, createContext, renderSpec } from "jsx-view"
import type { Subscription } from "rxjs"
import { map } from "rxjs/operators"
import createTodoState, { Todo } from "./TodoState"

const todos: Todo[] = [
  createTodo("Build UI for TodoApp", true),
  createTodo("Toggling a Todo"),
  createTodo("Deleting a Todo"),
  createTodo("Performant lists", true),
  createTodo("Adding a Todo"),
]

export default function mountApp(parentSub: Subscription, container: HTMLElement) {
  const element = renderSpec(parentSub, <TodoApp />)
  container.appendChild(element)
  parentSub.add(() => container.removeChild(element))
}

const TodoState = createContext(createTodoState(todos))

function TodoApp() {
  const state = useContext(TodoState)

  return (
    <div class="container">
      <h1>
        Todos <small style={{ fontSize: "16px" }}>APP</small>
      </h1>
      {/* Create an observable of a single element and drop it right in. */}
      {state.todos$.pipe(
        map((todosArr) => (
          <ul class="list-group">
            {todosArr.map((todo) => (
              <TodoItem todo={todo} />
            ))}
          </ul>
        )),
      )}
      <br />
      <form class="form-group" onsubmit={preventDefaultThen(state.addTodo)}>
        <label for="todo-title">New Todo Title</label>
        <div class="input-group">
          <input
            id="todo-title"
            type="text"
            class="form-control"
            // Assign any observable to any attribute when the
            // observable emits, the only work that happens is
            // a direct assignment to the attribute on the HTML
            // element.
            value={state.todoInput$}
            onchange={changeValue(state.updateNewTodoInput)}
            placeholder="What do you want to get done?"
          />
          <button class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  )
}

/** Todo Item appears within {@link TodoApp} */
function TodoItem({ todo }: { todo: Todo }) {
  const state = useContext(TodoState)

  return (
    <li
      class="list-group-item"
      {...onEnterOrClick(() => {
        state.toggleTodo(todo.id)
      })}
    >
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.title}</span>
      <button
        class="btn btn-sm btn-default float-right"
        aria-label={`Delete "${todo.title}"`}
        {...onEnterOrClick(() => {
          state.deleteTodo(todo.id)
        })}
      >
        🗑
      </button>
    </li>
  )
}
/**
 * Helper for creating `onchange` listeners
 * @example
 * <input onchange={changeValue(state.updateValue)} value={state.value$}/>
 */
export function changeValue(handler: (value: string) => any) {
  return function (this: HTMLFormElement | HTMLInputElement, _evt: ChangeEvent) {
    handler(this.value)
  }
}

/**
 * Helper for canceling default behaviors in functions
 * @example
 * <form
 *   onsubmit={preventDefaultThen(() => console.log('prevented default submit'))}
 * >
 *   ...
 *   <button>Submit</button>
 * </form>
 */
export function preventDefaultThen(handler: () => void) {
  return (evt: { preventDefault: Function }) => {
    evt.preventDefault()
    handler()
  }
}

/**
 * Helper for responding to enter key and click events.
 * This produces a set of properties that you must spread.
 *
 * Props:
 *  * `tabindex` for making the element tabbable
 *  * `onclick`
 *  * `onkeydown` for detecting enter key pressed on the element
 *
 * Example:
 * ```jsx
 *   <li {...onEnterOrClick(() => console.log('activated Item 1'))}>Item 1</li>
 * ```
 */
export function onEnterOrClick(handler: () => void): JSX.HtmlProps {
  return {
    tabindex: "0",
    onclick: (evt) => {
      evt.stopPropagation()
      handler()
    },
    onkeydown: (evt) => {
      if (evt.key === "Enter") {
        evt.stopPropagation()
        if (!(evt.currentTarget instanceof HTMLButtonElement || evt.currentTarget instanceof HTMLAnchorElement)) {
          // onClick will handle this one
          handler()
        }
      }
    },
  }
}

function createTodo(title: string, done = false): Todo {
  return {
    id: Math.random(),
    title,
    done,
  }
}
```

```ts
// TodoState.ts
import { BehaviorSubject } from "rxjs"

export type Todo = {
  id: number
  done: boolean
  title: string
}

export default function createTodoState(initialTodos: Todo[] = []) {
  const $todos$ = new BehaviorSubject(initialTodos)
  const $todoInput$ = new BehaviorSubject("")

  return {
    todos$: $todos$.asObservable(),
    todoInput$: $todoInput$.asObservable(),
    updateNewTodoInput(value: string) {
      debug("updateNewTodoInput", value)
      $todoInput$.next(value)
    },
    toggleTodo(id: number) {
      debug("toggleTodo", id)
      $todos$.next(
        $todos$.value.map((todo) =>
          todo.id === id
            ? // toggle
              { ...todo, done: !todo.done }
            : // don't update
              todo,
        ),
      )
    },
    deleteTodo(id: number) {
      debug("deleteTodo", id)
      $todos$.next($todos$.value.filter((todo) => todo.id !== id))
    },
    addTodo() {
      if ($todoInput$.value) {
        debug("addTodo", $todoInput$.value)
        $todos$.next([
          ...$todos$.value,
          {
            id: Math.random(),
            done: false,
            title: $todoInput$.value,
          },
        ])
        $todoInput$.next("")
      }
    },
  }
}

const debug = console.log.bind(console, "%cTodoState", "color: dodgerblue")
```

#### Setting up your `tsconfig.json` or `jsconfig.json`

```json
{
  "compilerOptions": {
    "lib": ["DOM"],
    "jsx": "react-jsxdev",
    "jsxImportSource": "jsx-view",
  }
}
```

#### Setting up with vite

```js
// vite.config.js or vite.config.ts
import * as path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // ...

  esbuild: {
    jsx: "automatic",
    jsxImportSource: "jsx-view",
  },
});
```

### Contributing

Clone the repository with
```sh
git clone https://github.com/colelawrence/jsx-view.git
```

Open the repository in terminal, and install dependencies using [pnpm](https://pnpm.io/).
```sh
cd jsx-view
pnpm install
```

Now, you have this locally, you may try things out by opening the
dev server with
```sh
pnpm playground
```
