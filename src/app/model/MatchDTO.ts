import {ScoreDTO} from "./ScoreDTO";
import {MatchTeamDTO} from "./MatchTeamDTO";

export class MatchDTO {
  id?: number
  utcDate?: Date
  status?: string
  matchday?: number
  score?: ScoreDTO
  homeTeam?: MatchTeamDTO
  awayTeam?: MatchTeamDTO
}
