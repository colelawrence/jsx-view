import { suite } from "@thi.ng/bench"

class ContextValue {
  constructor(public readonly key: any, public readonly value: any) {}
}

interface Context<T> {
  get(): T
}

interface ContextTracker {
  push<T>(context: Context<T>, value: T): void
  pop(): void
  pull<T>(context: Context<T>): T | undefined
}

interface ContextProvider {}

let tracker: ContextTracker = null!

function createContext<T>(value: T): Context<T> {
  const contextObj = {
    get() {
      return tracker.pull(contextObj) ?? value
    },
  }
  return contextObj
}

const contextA = createContext("A" as const)
const contextB = createContext("B" as const)
const contextC = createContext("C" as const)
const contextD = createContext("D" as const)
const contextE = createContext("E" as const)

function c(k: any, v: any) {
  return { k, v }
}

const trials: [any, any][] = [
  [contextA, "A"],
  [contextB, "B"],
  [contextC, "C"],
  [contextB, "B2"],
  [contextB, "B"],
  [contextC, "C"],
  [contextB, "B2"],
  [contextB, "B"],
  [contextC, "C"],
  [contextB, "B2"],
  [contextD, "D2"],
  [contextE, "E"],
]

const trial1 = [...trials]
const trial2 = new Map<any, any>(trials)
const trial3 = trial1.map(([key, val]) => new ContextValue(key, val))
const trial4 = trial1.map(([key, val]) => c(key, val))
// const trial5 = trial1.reduce((acc, [key, val]): { k: any; v: any; acc: any } | null => ({ k: key, v: val, acc }), null)

const ctxs = [contextC, contextA, contextE, contextD, contextB, contextE, contextA, contextD, contextB]

suite(
  [
    {
      title: "warm-up",
      opts: {},
      fn() {
        for (let i = 0; i < 1000; i++) {
          [trial1.slice(), i, new Map(trial2.entries()), i, trial3.slice()][Math.random()]
        }
      },
    },
    {
      title: "array of tuple eq (slice + push reverse)",
      opts: {},
      fn() {
        let v = null as any
        const newArray = trial1.slice()
        newArray.push([contextD, "D2"])
        for (const ctx of ctxs) {
          for (let i = newArray.length - 1; i > -1; i--) {
            const item = newArray[i]
            if (item[0] === ctx) {
              v = item[1]
              break
            }
          }
        }
        return v
      },
    },
    {
      title: "array of tuple eq (unshift)",
      opts: {},
      fn() {
        let v = null as any
        const newArray = [[contextD, "D2"], ...trial1]
        for (const ctx of ctxs) {
          for (let i = 0; i < newArray.length; i++) {
            const item = newArray[i]
            if (item[0] === ctx) {
              v = item[1]
              break
            }
          }
        }
        return v
      },
    },
    {
      title: "array of tuple eq (spread + rev)",
      opts: {},
      fn() {
        let v = null as any
        const newArray = [...trial1, [contextD, "D2"]]
        for (const ctx of ctxs) {
          for (let i = newArray.length - 1; i > -1; i--) {
            const item = newArray[i]
            if (item[0] === ctx) {
              v = item[1]
              break
            }
          }
        }
        return v
      },
    },
    {
      title: "map",
      opts: {},
      fn() {
        let v = null as any
        const newMap = new Map(trial2.entries())
        newMap.set(contextD, "D2")
        for (const ctx of ctxs) {
          v = newMap.get(ctx)
        }
        return v
      },
    },
    {
      title: "array of class eq",
      opts: {},
      fn() {
        let v = null as any
        const newArray = trial3.slice()
        newArray.push(new ContextValue(contextD, "D3"))
        for (const ctx of ctxs) {
          for (let i = newArray.length - 1; i > -1; i--) {
            const item = newArray[i]
            if (item.key === ctx) return item.value
          }
        }
        return v
      },
    },
    {
      title: "array of obj eq",
      opts: {},
      fn() {
        let v = null as any
        const newArray = trial4.slice()
        newArray.push(c(contextD, "D3"))
        for (const ctx of ctxs) {
          for (let i = newArray.length - 1; i > -1; i--) {
            const item = newArray[i]
            if (item.k === ctx) return item.v
          }
        }
        return v
      },
    },
    {
      title: "array of obj eq (unshift)",
      opts: {},
      fn() {
        let v = null as any
        const newArray = trial4.slice()
        newArray.unshift({ k: contextD, v: "D3" })
        for (const ctx of ctxs) {
          for (let i = 0; i < newArray.length; i++) {
            const item = newArray[i]
            if (item.k === ctx) return item.v
          }
        }
        return v
      },
    },
  ],
  { warmup: 1, iter: 1000, size: 10 },
)

export default 0
