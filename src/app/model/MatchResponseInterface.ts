export interface MatchResponseDTO {
  count: number;
  filters: Filters;
  competition: Competition;
  matches?: (MatchDTO)[] | null;
}
export interface Filters {
}
export interface Competition {
  id: number;
  area: AreaDTO;
  name: string;
  code: string;
  plan: string;
  lastUpdated: string;
}
export interface TeamDTO {
  id: number;
  tla: string | undefined;
  name: string;
}
export interface AreaDTO {
  id: number;
  name: string;
}
export interface MatchDTO {
  id: number;
  season: Season;
  utcDate: string;
  localDate: string;
  status: string;
  matchday: number;
  stage: string;
  group?: null;
  lastUpdated: string;
  odds: Odds;
  score: Score;
  homeTeam: TeamDTO;
  awayTeam: TeamDTO;
  referees?: (RefereesEntity | null)[] | null;
}
export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
}
export interface Odds {
  msg: string;
}
export interface Score {
  winner?: string | null;
  duration: string;
  fullTime: ScoreTimeDTO;
  halfTime: ScoreTimeDTO;
  extraTime: ScoreTimeDTO;
  penalties: ScoreTimeDTO;
}
export interface ScoreTimeDTO {
  homeTeam?: number | null;
  awayTeam?: number | null;
}
export interface RefereesEntity {
  id: number;
  name: string;
  role: string;
  nationality: string;
}
