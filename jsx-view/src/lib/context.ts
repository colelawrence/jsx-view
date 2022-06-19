export interface Context<T> {
  readonly defaultValue: T
}

type ContextStack = {
  /** parent */
  p: ContextStack | undefined
  /** empty frames between parent and stack item */
  e: number
  /** definitions */
  d: StackItem<unknown>[] | undefined | StackItem<unknown>
}

type StackItem<T> = {
  /** key */
  c: Context<T>
  /** value */
  v: T
}

class Stack {
  #current: ContextStack = {
    d: undefined,
    e: 0,
    p: undefined,
  }
  // TODO: Return a static object? from here for use by the renderer
  pushFrame() {
    if (!this.#current.d) {
      this.#current.e += 1
    } else {
      this.#current = {
        d: [],
        e: 0,
        p: this.#current,
      }
    }
  }
  popFrame() {
    if (this.#current.e === 0) {
      if (this.#current.p) this.#current = this.#current.p
      else console.warn("popped last frame must have been out of order")
    } else if (this.#current.d) {
      this.#current.d = undefined
    } else {
      this.#current.e -= 1
    }
  }

  add<T = unknown>(c: Context<T>, v: T) {
    if (Array.isArray(this.#current.d)) {
      this.#current.d.push({ c, v })
    } else if (this.#current.d) {
      this.#current.d = [{ c, v }, this.#current.d]
    } else {
      this.#current.d = { c, v }
    }
  }

  get<T = unknown>(c: Context<T>): T {
    for (let curr = this.#current as undefined | ContextStack; curr != null; curr = curr.p) {
      if (Array.isArray(curr.d)) {
        for (let i = curr.d.length - 1; i >= 0; i--) {
          if (curr.d[i].c === c) return curr.d[i].v as T
        }
      } else if (curr.d !== undefined && curr.d.c === c) return curr.d.v as T
    }

    return c.defaultValue
  }
}

/** internal */
export const globalContextStack = new Stack()

export function createContext<T>(defaultValue: T): Context<T> {
  return { defaultValue }
}

export function useContext<T>(context: Context<T>): T {
  return globalContextStack.get(context)
}

export function addContext<T>(context: Context<T>, value: T): T {
  globalContextStack.add(context, value)
  return value
}
