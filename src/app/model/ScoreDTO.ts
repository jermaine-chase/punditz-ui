import {ScoreTimeDTO} from "./ScoreTimeDTO";

export class ScoreDTO{
  winner?: string
  duration?: string
  fullTime?: ScoreTimeDTO
  halfTime?: ScoreTimeDTO
  extraTime?: ScoreTimeDTO
  penalties?: ScoreTimeDTO
}
