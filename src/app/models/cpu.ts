import { Base } from "./Base";

export interface CPU extends Base{
    launch: Date,
    endOfLife: Date
    type: "CPU"
}