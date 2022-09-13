import { map } from "rxjs/operators"
import { useContext, createContext } from "../../"
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
        Todos <small style={{ fontSize: 16 }}>APP</small>
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
