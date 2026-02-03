import { LeagueData, Match, Team, TeamStats } from "./types";
import { debounce } from "lodash";

export const initialData: LeagueData = {
  teams: [
    { id: "t1", name: "הפועל באר שבע", points: 48, goalDifference: 29, played: 21 },
    { id: "t2", name: "ביתר ירושלים", points: 47, goalDifference: 24, played: 21 },
    { id: "t3", name: "הפועל תל אביב", points: 38, goalDifference: 14, played: 21 },
    { id: "t4", name: "מכבי תל אביב", points: 39, goalDifference: 17, played: 21 },
    { id: "t5", name: "מכבי חיפה", points: 35, goalDifference: 18, played: 21 },
    { id: "t6", name: "הפועל פתח תקוה", points: 29, goalDifference: 4, played: 21 },
    { id: "t7", name: "בני סכנין", points: 28, goalDifference: -3, played: 21 },
    { id: "t8", name: "מכבי נתניה", points: 27, goalDifference: -9, played: 21 },
    { id: "t9", name: "עירוני טבריה", points: 22, goalDifference: -18, played: 21 },
    { id: "t10", name: "הפועל חיפה", points: 20, goalDifference: -9, played: 21 },
    { id: "t11", name: "מ.ס. אשדוד", points: 20, goalDifference: -17, played: 21 },
    { id: "t12", name: "הפועל קרית שמונה", points: 19, goalDifference: -9, played: 21 },
    { id: "t13", name: "הפועל ירושלים", points: 19, goalDifference: -10, played: 21 },
    { id: "t14", name: "מכבי בני ריינה", points: 11, goalDifference: -31, played: 21 },
  ],

  matches: [
    // Round 22
    { id: "m22-1", homeTeamId: "t9", awayTeamId: "t3", homeGoals: null, awayGoals: null, played: false, gameWeek: 22 },
    { id: "m22-2", homeTeamId: "t13", awayTeamId: "t5", homeGoals: null, awayGoals: null, played: false, gameWeek: 22 },
    { id: "m22-3", homeTeamId: "t10", awayTeamId: "t11", homeGoals: null, awayGoals: null, played: false, gameWeek: 22 },
    { id: "m22-4", homeTeamId: "t7", awayTeamId: "t6", homeGoals: null, awayGoals: null, played: false, gameWeek: 22 },
    { id: "m22-5", homeTeamId: "t8", awayTeamId: "t12", homeGoals: null, awayGoals: null, played: false, gameWeek: 22 },
    { id: "m22-6", homeTeamId: "t4", awayTeamId: "t14", homeGoals: null, awayGoals: null, played: false, gameWeek: 22 },
    { id: "m22-7", homeTeamId: "t1", awayTeamId: "t2", homeGoals: null, awayGoals: null, played: false, gameWeek: 22 },

    // Round 23
    { id: "m23-1", homeTeamId: "t3", awayTeamId: "t13", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-2", homeTeamId: "t6", awayTeamId: "t10", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-3", homeTeamId: "t12", awayTeamId: "t9", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-4", homeTeamId: "t14", awayTeamId: "t8", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-5", homeTeamId: "t11", awayTeamId: "t1", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-6", homeTeamId: "t5", awayTeamId: "t7", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-7", homeTeamId: "t2", awayTeamId: "t4", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },

    // Round 24
    { id: "m24-1", homeTeamId: "t4", awayTeamId: "t11", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-2", homeTeamId: "t5", awayTeamId: "t6", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-3", homeTeamId: "t13", awayTeamId: "t12", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-4", homeTeamId: "t7", awayTeamId: "t3", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-5", homeTeamId: "t9", awayTeamId: "t14", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-6", homeTeamId: "t1", awayTeamId: "t10", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-7", homeTeamId: "t8", awayTeamId: "t2", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },

    // Round 25
    { id: "m25-1", homeTeamId: "t14", awayTeamId: "t13", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-2", homeTeamId: "t12", awayTeamId: "t7", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-3", homeTeamId: "t2", awayTeamId: "t9", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-4", homeTeamId: "t10", awayTeamId: "t4", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-5", homeTeamId: "t1", awayTeamId: "t6", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-6", homeTeamId: "t11", awayTeamId: "t8", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-7", homeTeamId: "t3", awayTeamId: "t5", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },

    // Round 26
    { id: "m26-1", homeTeamId: "t9", awayTeamId: "t11", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-2", homeTeamId: "t4", awayTeamId: "t1", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-3", homeTeamId: "t7", awayTeamId: "t14", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-4", homeTeamId: "t6", awayTeamId: "t3", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-5", homeTeamId: "t5", awayTeamId: "t12", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-6", homeTeamId: "t8", awayTeamId: "t10", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-7", homeTeamId: "t13", awayTeamId: "t2", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
  ],
  currentGameWeek: 22,
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
      played: team.played || 0,
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
    if (a.points > b.points) return -1;
    if (a.points < b.points) return 1;
    return b.goalDifference - a.goalDifference
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
  currentGameWeek: number,
  simulations = 10000
): TeamStats[] {
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
      if (match.awayGoals !== null && match.homeGoals !== null) {
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

    simulatedStats.slice(0, 6).forEach((stats) => {
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
