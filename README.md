
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

## Todo App example

> This was adapted from [a similar demo I put together with React + RxJS](https://refactorordie.com/storybook/?path=/story/writing-observable-state-presentations--react-nyc-oct-2019-todo-app), so if tehre's something missing or misspelled, please accept my apologies.

```jsx
import { map } from "rxjs/operators"
import { useContext, createContext } from "jsx-view"
import createTodoState from "./TodoState"

/** @type {Todo[]} */
const todos = [
  createTodo("Build UI for TodoApp", true),
  createTodo("Toggling a Todo"),
  createTodo("Deleting a Todo"),
  createTodo("Performant lists", true),
  createTodo("Adding a Todo"),
]

export default function AppRoot() {
  return <TodoApp></TodoApp>
}

const TodoState = createContext(createTodoState(todos))

function TodoApp() {
  const state = useContext(TodoState)

  return (
    <div class="container">
      <h1>
        Todos <small style={{ fontSize: "16px" }}>APP</small>
      </h1>
      <ul class="list-group">
        {state.todos$.pipe(map((todosArr) => todosArr.map((todo) => <TodoItem todo={todo} />)))}
      </ul>
      <br />
      <form class="form-group" onSubmit={preventDefaultThen(state.addTodo)}>
        <label htmlFor="todo-title">New Todo Title</label>
        <div class="input-group">
          <state.$todoInput.react
            next={(value) => (
              <input
                id="todo-title"
                type="text"
                class="form-control"
                value={value}
                onchange={changeValue(state.updateNewTodoInput)}
                placeholder="What do you want to get done?"
              />
            )}
          />
          <button class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  )
}

/**
 * TodoItem appears within the TodoApp
 * @param {{ todo: Todo }} props
 */
function TodoItem({ todo }) {
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
 *
 * Example:
 * ```jsx
 *  return <input onchange={changeValue(state.updateValue)} value={state.value$}/>
 * ```
 *
 * @param {(value: string) => any} handler
 * @returns {(this: HTMLFormElement | HTMLInputElement, evt: ChangeEvent) => void}
 */
export function changeValue(handler) {
  return function () {
    handler(this.value)
  }
}

/**
 * Helper for canceling default behaviors in functions
 *
 * Example:
 * ```jsx
 *  return <form
 *    onsubmit={preventDefaultThen(() => console.log('prevented default submit'))}
 *  >
 *    ...
 *    <button>Submit</button>
 *  </form>
 * ```
 *
 * @param {() => void} handler
 * @returns {(evt: { preventDefault: Function }) => void}
 */
export function preventDefaultThen(handler) {
  return (evt) => {
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
 *
 * @param {() => void} handler
 * @returns {JSX.HtmlProps}
 */
export function onEnterOrClick(handler) {
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

```

```js
// TodoState.js
// @ts-check
import { BehaviorSubject } from "rxjs"

/**
 * @param {Todo[]} initialTodos
 * @returns the "ViewModel"
 */
export default function createTodoState(initialTodos = []) {
  // "Model" values
  const $todoInput$ = new BehaviorSubject("")
  // jsx-view does not have diffing, so if you're re-rendering a constantly changing list
  // you'll want to write a list helper for rxjs like the
  // [BehaviorList](https://github.com/colelawrence/behavior-state/blob/master/src/BehaviorList.ts),
  // which is an observable of an array of observables with a buffer.
  const $todos$ = new BehaviorSubject(initialTodos)

  return {
    todos$: $todos$.asObservable(),
    todoInput$: $todoInput$.asObservable(),
    updateNewTodoInput(value) {
      debug("updateNewTodoInput", value)
      $todoInput$.next(value)
    },
    toggleTodo(id) {
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
    deleteTodo(id) {
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

**Features**

- No DOM diffing and no "lifecycle loop". Only Observables which get subscribed to and [directly update the DOM elements](src/examples/observable-elements.spec.tsx).
- Minimal JSX wiring up with full type definitions for all common `HTMLElement` attributes.
- Any attribute accepts an Observable of its value, and this is type checked.
- An Observable of any [`JSX.Child`](src/lib/jsxSpec.ts) (`string`, `null`, `JSX.Element`, etc), can be used as a `JSX.Child`.
- Adds [special props](src/lib/declare/declare-special-props.ts): `is`, `$style`, `$class`, `ref`, and `tags`.
- exports declaration maps (go-to-def goes to TypeScript source code)

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
