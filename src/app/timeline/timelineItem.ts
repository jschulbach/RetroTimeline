import { Base } from "../models/Base"

export interface timelineItem {
    metaData: Base,
    leftPos: number,
    topPos: number,
    width?: number,
    display: boolean
}