import { createContext } from '@astropub/context'

export const [ Provider, getContext ] = createContext<{ level: number }>()
