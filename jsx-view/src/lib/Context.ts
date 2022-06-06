import { ExoticSpec } from "./jsxSpec"

export interface Context<T> {
  readonly defaultValue: T
  Provider(props: { value: T }, children: JSX.Element[]): JSX.Element
}

type InternalContextItem<T> = { c: Context<T>; v: T }
function c<T>(c: Context<T>, v: T): InternalContextItem<T> {
  return { c, v }
}

export function createContext<T>(defaultValue: T): Context<T> {
  return {
    defaultValue,
    Provider({ value }, children) {
      return new ExoticSpec({
        // displayName: "Context.Provider",
        addToContext: [c(this, value)],
        children,
      })
    },
  }
}
