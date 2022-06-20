
export interface Context<T> {
  readonly defaultValue: T;
}

export function createContext<T>(defaultValue: T): Context<T> {
  return { defaultValue };
}
