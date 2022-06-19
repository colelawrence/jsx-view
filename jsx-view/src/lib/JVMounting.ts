import { AnyAttrs } from "./jsx";

// // phase 1: Fiber tree (interruptable)
// // phase 2: commit to DOM (non-interruptable)
// // something requestIdleCallback
// type Fiber = {
//   stateNode: unknown
//   child?: Fiber
//   return: Fiber
//   sibling?: Fiber
// }
// function useSelect<T = HTMLElement>(selector: string, kind: { new (): T }): Observable<T> {
//   useMounted()
// }
// function useMounted(): Observable<undefined | Element | Element[]> {
//   throw useMounted
// }
// useSelect("input.blah", HTMLInputElement)

export abstract class JVMounting<S = {}> {
  abstract mount(target: Node, prev?: S | undefined): S;
}

export class JVIntrinsic extends JVMounting<string> {
  constructor(private readonly tag: string, private readonly attrs: AnyAttrs) {
    super();
  }
  mount(target: Node, value: string) {
    return "";
  }
}

export class JVFunction<P extends {} = {}> extends JVMounting {
  constructor(private readonly fn: (attrs: P) => JVMounting, private readonly attrs: P) {
    super();
  }
  mount(target: Node, prevState: { hello: 2; }) {
    return {};
  }
}
