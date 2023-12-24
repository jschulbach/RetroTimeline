import { Category } from "./category.enum"

export interface Base {
    id: string,
    name: string,
    type: Category,
    releaseDate: string,
    endOfLifeDate?: string
}