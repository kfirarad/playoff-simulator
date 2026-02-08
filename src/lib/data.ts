import { LeagueData, Match, Team, TeamStats } from "./types";
import { debounce } from "lodash";

export const initialData: LeagueData = {
  teams: [
    { id: "HBS", name: "הפועל באר שבע", points: 48, goalDifference: 29, played: 21, color: "#e31e24", textColor: "#ffffff" },
    { id: "BJ", name: "ביתר ירושלים", points: 47, goalDifference: 24, played: 21, color: "#fff200", textColor: "#000000" },
    { id: "HTA", name: "הפועל תל אביב", points: 38, goalDifference: 14, played: 21, color: "#ed1c24", textColor: "#ffffff" },
    { id: "MTA", name: "מכבי תל אביב", points: 39, goalDifference: 17, played: 21, color: "#0054a6", textColor: "#fde047" },
    { id: "MH", name: "מכבי חיפה", points: 35, goalDifference: 18, played: 21, color: "#009640", textColor: "#ffffff" },
    { id: "HPT", name: "הפועל פתח תקוה", points: 29, goalDifference: 4, played: 21, color: "#0055a5", textColor: "#ffffff" },
    { id: "BS", name: "בני סכנין", points: 28, goalDifference: -3, played: 21, color: "#ed1c24", textColor: "#ffffff" },
    { id: "MN", name: "מכבי נתניה", points: 27, goalDifference: -9, played: 21, color: "#fff200", textColor: "#000000" },
    { id: "ET", name: "עירוני טבריה", points: 22, goalDifference: -18, played: 21, color: "#0072bc", textColor: "#ffffff" },
    { id: "HH", name: "הפועל חיפה", points: 20, goalDifference: -9, played: 21, color: "#ed1c24", textColor: "#ffffff" },
    { id: "MSA", name: "מ.ס. אשדוד", points: 20, goalDifference: -17, played: 21, color: "#ffce00", textColor: "#ed1c24" },
    { id: "HKS", name: "הפועל קרית שמונה", points: 19, goalDifference: -9, played: 21, color: "#00a9e0", textColor: "#ffffff" },
    { id: "HJ", name: "הפועל ירושלים", points: 19, goalDifference: -10, played: 21, color: "#ed1c24", textColor: "#000000" },
    { id: "MBR", name: "מכבי בני ריינה", points: 11, goalDifference: -31, played: 21, color: "#0054a6", textColor: "#ffffff" },
  ],

  matches: [
    // Round 22
    { id: "m22-1", homeTeamId: "ET", awayTeamId: "HTA", homeGoals: 0, awayGoals: 2, played: true, gameWeek: 22 },
    { id: "m22-2", homeTeamId: "HJ", awayTeamId: "MH", homeGoals: 1, awayGoals: 1, played: true, gameWeek: 22 },
    { id: "m22-3", homeTeamId: "HH", awayTeamId: "MSA", homeGoals: 0, awayGoals: 2, played: true, gameWeek: 22 },
    { id: "m22-4", homeTeamId: "BS", awayTeamId: "HPT", homeGoals: 1, awayGoals: 2, played: true, gameWeek: 22 },
    { id: "m22-5", homeTeamId: "MN", awayTeamId: "HKS", homeGoals: 2, awayGoals: 2, played: true, gameWeek: 22 },
    { id: "m22-6", homeTeamId: "MTA", awayTeamId: "MBR", homeGoals: null, awayGoals: null, played: false, gameWeek: 22 },
    { id: "m22-7", homeTeamId: "HBS", awayTeamId: "BJ", homeGoals: null, awayGoals: null, played: false, gameWeek: 22 },

    // Round 23
    { id: "m23-1", homeTeamId: "HTA", awayTeamId: "HJ", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-2", homeTeamId: "HPT", awayTeamId: "HH", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-3", homeTeamId: "HKS", awayTeamId: "ET", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-4", homeTeamId: "MBR", awayTeamId: "MN", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-5", homeTeamId: "MSA", awayTeamId: "HBS", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-6", homeTeamId: "MH", awayTeamId: "BS", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },
    { id: "m23-7", homeTeamId: "BJ", awayTeamId: "MTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 23 },

    // Round 24
    { id: "m24-1", homeTeamId: "MTA", awayTeamId: "MSA", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-2", homeTeamId: "MH", awayTeamId: "HPT", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-3", homeTeamId: "HJ", awayTeamId: "HKS", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-4", homeTeamId: "BS", awayTeamId: "HTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-5", homeTeamId: "ET", awayTeamId: "MBR", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-6", homeTeamId: "HBS", awayTeamId: "HH", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },
    { id: "m24-7", homeTeamId: "MN", awayTeamId: "BJ", homeGoals: null, awayGoals: null, played: false, gameWeek: 24 },

    // Round 25
    { id: "m25-1", homeTeamId: "MBR", awayTeamId: "HJ", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-2", homeTeamId: "HKS", awayTeamId: "BS", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-3", homeTeamId: "BJ", awayTeamId: "ET", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-4", homeTeamId: "HH", awayTeamId: "MTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-5", homeTeamId: "HBS", awayTeamId: "HPT", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-6", homeTeamId: "MSA", awayTeamId: "MN", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },
    { id: "m25-7", homeTeamId: "HTA", awayTeamId: "MH", homeGoals: null, awayGoals: null, played: false, gameWeek: 25 },

    // Round 26
    { id: "m26-1", homeTeamId: "ET", awayTeamId: "MSA", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-2", homeTeamId: "MTA", awayTeamId: "HBS", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-3", homeTeamId: "BS", awayTeamId: "MBR", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-4", homeTeamId: "HPT", awayTeamId: "HTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-5", homeTeamId: "MH", awayTeamId: "HKS", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-6", homeTeamId: "MN", awayTeamId: "HH", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
    { id: "m26-7", homeTeamId: "HJ", awayTeamId: "BJ", homeGoals: null, awayGoals: null, played: false, gameWeek: 26 },
  ],
  currentGameWeek: 22,
};

export const dataHash = initialData.matches
  .filter((m) => m.played)
  .map((m) => `${m.id}:${m.homeGoals}-${m.awayGoals}`)
  .join("|");


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
  simulations = 10000,
  useWeighted = false
): TeamStats[] {
  const topPositionCounts: { [key: string]: number } = {};

  // Calculate current standings first to get accurate team performance
  const currentStats = calculateTeamStats(teams, currentMatches);

  // Calculate team strengths if weighted simulation is enabled
  const teamStrengths: { [key: string]: number } = {};
  if (useWeighted) {
    currentStats.forEach((stats) => {
      // Base strength calculation: points per game from current standings
      const pointsPerGame = stats.played > 0
        ? stats.points / stats.played
        : 0;

      // Normalize to 0-1 range (max 3 points per game)
      // Using 30% base chance, 70% skill based to make strength differences more pronounced
      teamStrengths[stats.teamId] = (pointsPerGame / 3) * 0.7 + 0.3;
    });
  }

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
        if (useWeighted) {
          const homeStrength = teamStrengths[match.homeTeamId] || 0.5;
          const awayStrength = teamStrengths[match.awayTeamId] || 0.5;

          // Home advantage factor (e.g., 10% boost)
          const homeAdvantage = 1.1;

          const homePower = homeStrength * homeAdvantage;
          const totalPower = homePower + awayStrength;

          const homeWinProb = homePower / totalPower;

          // Determine winner based on probability
          const rand = Math.random();

          // Generate score based on winner
          // Basic logic: winner gets more goals
          if (rand < homeWinProb * 0.6) {
            // Home Win
            match.homeGoals = Math.floor(Math.random() * 3) + 1; // 1-3
            match.awayGoals = Math.floor(Math.random() * match.homeGoals); // less than home
          } else if (rand > 1 - (1 - homeWinProb) * 0.6) {
            // Away Win
            match.awayGoals = Math.floor(Math.random() * 3) + 1; // 1-3
            match.homeGoals = Math.floor(Math.random() * match.awayGoals); // less than away
          } else {
            // Draw
            match.homeGoals = Math.floor(Math.random() * 3); // 0-2
            match.awayGoals = match.homeGoals;
          }
        } else {
          // Pure random
          match.homeGoals = Math.floor(Math.random() * 4);
          match.awayGoals = Math.floor(Math.random() * 4);
        }
        match.played = true;
      }
    });

    // Calculate final standings for this simulation
    const simulatedStats = calculateTeamStats(teams, simulatedMatches);

    simulatedStats.slice(0, 6).forEach((stats) => {
      topPositionCounts[stats.teamId]++;
    });
  }

  // Add probability and strength to each team's stats
  return currentStats.map((stats) => {
    return {
      ...stats,
      probability: (topPositionCounts[stats.teamId] / simulations) * 100,
      strength: useWeighted ? teamStrengths[stats.teamId] : undefined,
    };
  });
};

export const decounceCalculateProbabilities = debounce(calculateProbabilities, 1000);
