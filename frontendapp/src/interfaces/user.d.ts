import type { USERS_FILTERS } from '../consts'

export interface User {
    id?: number|null
    name: string
    email: string
    age: number
    [key: string]: string | undefined
}

export type UserList = User[]

export type FilterValue = typeof USERS_FILTERS[keyof typeof USERS_FILTERS]