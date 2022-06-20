/** internal stack with state field s */
export class St<T, S> {
  #curr: number = -1
  #stack: T[] = new Array(64).fill(undefined)
  constructor(public s: S) {}
  push(add: T) {
    this.#curr += 1
    this.#stack[this.#curr] = add
  }
  pop() {
    this.#stack[this.#curr] = undefined!
    this.#curr -= 1
  }
  get() {
    if (this.#curr < 0) {
      throw new Error("Unexpected Stack.get")
    }

    return this.#stack[this.#curr]!
  }
}
