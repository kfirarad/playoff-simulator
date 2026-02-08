
export interface Team {
  id: string;
  name: string;
  goalDifference: number;
  points: number;
  played: number;
  color?: string;
  textColor?: string;
}

export interface TeamStats {
  goalsAgainst: number;
  goalsFor: number;
  teamId: string;
  played: number;
  goalDifference: number;
  points: number;
  position?: number;
  probability?: number;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeGoals: number | null;
  awayGoals: number | null;
  played: boolean;
  gameWeek: number;
}

export type MatchOutcome = {
  matchId: string;
  homeGoals: number;
  awayGoals: number;
};

export type LeagueData = {
  teams: Team[];
  matches: Match[];
  currentGameWeek: number;
};
