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
