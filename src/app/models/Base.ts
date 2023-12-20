import { Category } from "./category.enum"

export interface Base {
    name: string,
    type: Category,
    releaseDate: string,
    endOfLifeDate?: string
}