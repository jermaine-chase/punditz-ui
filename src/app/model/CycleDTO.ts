import {MatchDTO} from "./MatchResponseInterface";

export interface CycleDTO {
  cycleNumber: number
  matches: number[]
  start: Date
  end: Date
}
