// mark as a module for TypeScript
export default {}

type NonNullableValues<T> = { [P in keyof T]-?: NonNullable<T[P]> }
type EventOnListeners = NonNullableValues<
  Omit<GlobalEventHandlers, "addEventListener" | "removeEventListener" | "oninput" | "onchange">
>

// Fixes "this" binding to the actual HTMLElement type which the event is emitted from
type EventPropsWithThisElement<T> = {
  [P in keyof EventOnListeners]: Parameters<EventOnListeners[P]> extends [infer E]
    ? (this: T, event: E) => any | null
    : EventOnListeners[P]
}

declare global {
  interface InputEvent extends Event {
    target: HTMLInputElement | HTMLTextAreaElement
  }

  interface ChangeEvent extends Event {
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  }

  namespace JSX {
    interface HtmlProps<T extends HTMLElement = HTMLElement> extends Partial<EventPropsWithThisElement<T>> {
      oninput?: (this: T, event: InputEvent) => any
      onchange?: (this: T, event: ChangeEvent) => any
    }
  }
}
