export interface TeamResponseDTO {
  count: number;
  filters: Filters;
  competition: Competition;
  season: Season;
  teams?: (TeamsEntity)[] | null;
}
export interface Filters {
}
export interface Competition {
  id: number;
  area: Area;
  name: string;
  code: string;
  plan: string;
  lastUpdated: string;
}
export interface Area {
  id: number;
  name: string;
}
export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner?: null;
}
export interface TeamsEntity {
  id: number;
  area: Area;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone?: string | null;
  website: string;
  email?: string | null;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}
