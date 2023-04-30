import { Base } from "../models/Base"

export interface timelineItem {
    metaData: Base,
    startDate: Date,
    endDate?: Date,
    leftPos: number,
    topPos: number,
    width?: number,
    display: boolean
}