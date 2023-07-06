export interface PicksForm {
  picks: PickCombo[];
}

export interface PickCombo {
  gameId: number;
  team: string;
  points: number;
  disable: boolean;
  userId: string | undefined;
}

export interface PredictionsForm {
  teams: string[];
}

export interface StandingForm {
  standings: StandingCombo;

}

export interface StandingCombo {
  player: string;
  cycle: number;
  total: number;
  position: number;
}

export interface GameResultsForm {
  gameResults: GameResultCombo[];
}

export interface GameResultCombo {
  gameId: number;
  result: string;
  home: TeamCombo;
  away: TeamCombo;
}

export interface TeamCombo {
  name: string;
  score: number;
}

export interface CycleScoresForm {
  player: string;
  cycleScore: WagersCombo[];
}

export interface WagersCombo {
  gameId: number;
  team: string;
  wager: number;
}

export interface QuarterlyForm {
  row: QuarterCombo;
}

export interface QuarterCombo {
  player: string;
  quarters: Quarter[];
}

export interface Quarter {
  num: number;
  points: number;
  position: number;
}

export interface RegisterForm {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  active: boolean;
  admin: boolean;
}

export interface ExceptionForm {
  exceptions: ExceptionCombo[];
}

export interface ExceptionCombo {
  gameId: number;
  gameDate: string;
  homeTla: string;
  awayTla: string;
  exception: boolean;
  exceptionTimestamp: Date | undefined;
}
