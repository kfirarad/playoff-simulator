import { LeagueData, Match, Team, TeamStats } from "./types";
import { debounce } from "lodash";
export const initialData: LeagueData = {
  teams: [
    { id: "t1", name: "הפועל תל-אביב", points: 72, goalDifference: 43 },
    { id: "t2", name: "הפועל פתח-תקוה", points: 71 , goalDifference: 33},
    { id: "t3", name: "הפועל כפר-שלם", points: 59, goalDifference: 24},
    { id: "t4", name: "הפועל רמת גן", points: 56, goalDifference: 29 },
    { id: "t5", name: "בני יהודה", points: 44 , goalDifference: 1},
    { id: "t6", name: "מכבי הרצליה", points: 42, goalDifference: -14 },
    { id: "t7", name: "הפועל כפר סבא", points: 40, goalDifference: 0 },
    { id: "t8", name: "הפועל ראשון לציון", points: 40, goalDifference: -2 },
  ],

  matches: [
    { id: "m1", homeTeamId: "t1", awayTeamId: "t5", homeGoals: null, awayGoals: null, played: false, gameWeek: 31 },
    { id: "m2", homeTeamId: "t2", awayTeamId: "t7", homeGoals: null, awayGoals: null, played: false, gameWeek: 31 },
    { id: "m3", homeTeamId: "t3", awayTeamId: "t6", homeGoals: null, awayGoals: null, played: false, gameWeek: 31 },
    { id: "m4", homeTeamId: "t4", awayTeamId: "t8", homeGoals: 2, awayGoals: 0, played: true, gameWeek: 31 },
    { id: "m5", homeTeamId: "t5", awayTeamId: "t8", homeGoals: null, awayGoals: null, played: false, gameWeek: 32 },
    { id: "m6", homeTeamId: "t6", awayTeamId: "t4", homeGoals: null, awayGoals: null, played: false, gameWeek: 32 },
    { id: "m7", homeTeamId: "t7", awayTeamId: "t3", homeGoals: null, awayGoals: null, played: false, gameWeek: 32 },
    { id: "m8", homeTeamId: "t1", awayTeamId: "t2", homeGoals: null, awayGoals: null, played: false, gameWeek: 32 },
    { id: "m9", homeTeamId: "t2", awayTeamId: "t5", homeGoals: null, awayGoals: null, played: false, gameWeek: 33 },
    { id: "m10", homeTeamId: "t3", awayTeamId: "t1", homeGoals: null, awayGoals: null, played: false, gameWeek: 33 },
    { id: "m11", homeTeamId: "t4", awayTeamId: "t7", homeGoals: null, awayGoals: null, played: false, gameWeek: 33 },
    { id: "m12", homeTeamId: "t8", awayTeamId: "t6", homeGoals: null, awayGoals: null, played: false, gameWeek: 33 },
    { id: "m13", homeTeamId: "t5", awayTeamId: "t6", homeGoals: null, awayGoals: null, played: false, gameWeek: 34 },
    { id: "m14", homeTeamId: "t7", awayTeamId: "t8", homeGoals: null, awayGoals: null, played: false, gameWeek: 34 },
    { id: "m15", homeTeamId: "t1", awayTeamId: "t4", homeGoals: null, awayGoals: null, played: false, gameWeek: 34 },
    { id: "m16", homeTeamId: "t2", awayTeamId: "t3", homeGoals: null, awayGoals: null, played: false, gameWeek: 34 },
    { id: "m17", homeTeamId: "t3", awayTeamId: "t5", homeGoals: null, awayGoals: null, played: false, gameWeek: 35 },
    { id: "m18", homeTeamId: "t4", awayTeamId: "t2", homeGoals: null, awayGoals: null, played: false, gameWeek: 35 },
    { id: "m19", homeTeamId: "t8", awayTeamId: "t1", homeGoals: null, awayGoals: null, played: false, gameWeek: 35 },
    { id: "m20", homeTeamId: "t6", awayTeamId: "t7", homeGoals: null, awayGoals: null, played: false, gameWeek: 35 },
    { id: "m21", homeTeamId: "t5", awayTeamId: "t7", homeGoals: null, awayGoals: null, played: false, gameWeek: 36 },
    { id: "m22", homeTeamId: "t1", awayTeamId: "t6", homeGoals: null, awayGoals: null, played: false, gameWeek: 36 },
    { id: "m23", homeTeamId: "t2", awayTeamId: "t8", homeGoals: null, awayGoals: null, played: false, gameWeek: 36 },
    { id: "m24", homeTeamId: "t3", awayTeamId: "t4", homeGoals: null, awayGoals: null, played: false, gameWeek: 36 },
    { id: "m25", homeTeamId: "t4", awayTeamId: "t5", homeGoals: null, awayGoals: null, played: false, gameWeek: 37 },
    { id: "m26", homeTeamId: "t8", awayTeamId: "t3", homeGoals: null, awayGoals: null, played: false, gameWeek: 37 },
    { id: "m27", homeTeamId: "t6", awayTeamId: "t2", homeGoals: null, awayGoals: null, played: false, gameWeek: 37 },
    { id: "m28", homeTeamId: "t7", awayTeamId: "t1", homeGoals: null, awayGoals: null, played: false, gameWeek: 37 }
  ],
  currentGameWeek: 31,
};


function rotateArray<T>(arr: T[], positions: number): T[] {
  const pos = positions % arr.length;
  return [...arr.slice(pos), ...arr.slice(0, pos)];
}

export function calculateTeamStats(teams: Team[], matches: Match[]): TeamStats[] {
  const stats: { [key: string]: TeamStats } = {};

  // Initialize stats for all teams
  teams.forEach((team) => {
    stats[team.id] = {
      teamId: team.id,
      played: 30,
      goalDifference: initialData.teams.find((t) => t.id === team.id)?.goalDifference || 0,
      points: initialData.teams.find((t) => t.id === team.id)?.points || 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };
  });

  // Update stats based on played matches
  matches.forEach((match) => {
    if (match.homeGoals === null || match.awayGoals === null) return;

    const homeStats = stats[match.homeTeamId];
    const awayStats = stats[match.awayTeamId];

    // update goalDifference 
    homeStats.goalDifference += match.homeGoals - match.awayGoals;
    awayStats.goalDifference += match.awayGoals - match.homeGoals;

    // Update home team stats
    homeStats.played += 1;

    // Update away team stats
    awayStats.played += 1;

    // Update win/draw/loss and points
    if (match.homeGoals > match.awayGoals) {
      homeStats.points += 3;
    } else if (match.homeGoals < match.awayGoals) {
      awayStats.points += 3;
    } else {
      homeStats.points += 1;
      awayStats.points += 1;
    }
  });

  // Convert to array and sort by points (then goal difference, then goals scored)
  const statsArray = Object.values(stats);
  statsArray.sort((a, b) => {
    // Sort by points (descending)
    if(a.points > b.points ) return -1;
    if(a.points < b.points ) return 1;        
    const aGoalDiff = a.goalsFor - a.goalsAgainst;
    const bGoalDiff = b.goalsFor - b.goalsAgainst;
    return bGoalDiff - aGoalDiff;
    
    // If goal difference is equal, sort by goals scored (descending)
    return b.goalsFor - a.goalsFor;
  });

  // Assign positions
  statsArray.forEach((stats, index) => {
    stats.position = index + 1;
  });

  return statsArray;
}


export const calculateProbabilities = function calculateProbabilities(
  teams: Team[], 
  currentMatches: Match[],
  currentGameWeek: number
): TeamStats[] {
  const simulations = 10000;
  const topPositionCounts: { [key: string]: number } = {};
  
  // Initialize counts
  teams.forEach((team) => {
    topPositionCounts[team.id] = 0;
  });

  // Run simulations
  for (let i = 0; i < simulations; i++) {
    // Clone current matches
    const simulatedMatches = JSON.parse(JSON.stringify(currentMatches)) as Match[];
    
    // mark matches as played if have outcome
    simulatedMatches.forEach((match) => {
      if(match.awayGoals !== null && match.homeGoals !== null) {
        match.played = true;
      }
    });

    // Randomly simulate remaining matches
    simulatedMatches.forEach((match) => {
      if (!match.played && match.gameWeek >= currentGameWeek) {
        // Simple random outcome generator for simulation
        match.homeGoals = Math.floor(Math.random() * 4);
        match.awayGoals = Math.floor(Math.random() * 4);
        match.played = true;
      }
    });
    
    // Calculate final standings for this simulation
    const simulatedStats = calculateTeamStats(teams, simulatedMatches);
    
    simulatedStats.slice(0, 2).forEach((stats) => {
      topPositionCounts[stats.teamId]++;
    });
  }
  
  // Calculate current standings and add probability
  const currentStats = calculateTeamStats(teams, currentMatches);
  
  // Add probability to each team's stats
  return currentStats.map((stats) => {
    return {
      ...stats,
      probability: (topPositionCounts[stats.teamId] / simulations) * 100,
    };
  });
};

export const decounceCalculateProbabilities = debounce(calculateProbabilities, 1000);