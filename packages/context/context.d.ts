/** Creates a context that can be used in Astro components. */
export declare const createContext: CreateContext

/** Creates a context that can be used in Astro components. */
type CreateContext = <T extends unknown>() => Context<T>

/** Tuple containing the Provider component and a getter function for the current context. */
type Context<T> = [(props: T) => any, () => T]