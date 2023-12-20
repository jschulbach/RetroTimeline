import { Base } from "./Base";
import { Category } from "./category.enum";

export interface CPU extends Base{
    launch: Date,
    endOfLife: Date
    type: Category.CPU
}