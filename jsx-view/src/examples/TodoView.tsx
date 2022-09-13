// TodoView.tsx
import { useContext, createContext, renderSpec } from "../.."
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
