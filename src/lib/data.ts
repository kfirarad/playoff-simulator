import { LeagueData, Match, Team, TeamStats } from "./types";
import { debounce } from "lodash";

const TARGET_POS = 1;

export const initialData: LeagueData = {
  teams: [
    { id: "HBS", name: "הפועל באר שבע", points: 59, goalDifference: 33, played: 26, color: "#e31e24", textColor: "#ffffff" },
    { id: "BJR", name: "ביתר ירושלים", points: 57, goalDifference: 32, played: 26, color: "#fff200", textColor: "#000000" },
    { id: "HTA", name: "הפועל תל אביב", points: 49, goalDifference: 23, played: 26, color: "#ed1c24", textColor: "#ffffff" },
    { id: "MTA", name: "מכבי תל אביב", points: 49, goalDifference: 20, played: 26, color: "#0054a6", textColor: "#fde047" },
    { id: "MHF", name: "מכבי חיפה", points: 42, goalDifference: 22, played: 26, color: "#009640", textColor: "#ffffff" },
    { id: "HPT", name: "הפועל פתח תקוה", points: 37, goalDifference: 5, played: 26, color: "#0055a5", textColor: "#ffffff" },
  ],

  matches: [
    // Round 27
    { id: "m27-1", homeTeamId: "HBS", awayTeamId: "HPT", homeGoals: null, awayGoals: null, played: false, gameWeek: 27 },
    { id: "m27-2", homeTeamId: "BJR", awayTeamId: "MHF", homeGoals: null, awayGoals: null, played: false, gameWeek: 27 },
    { id: "m27-3", homeTeamId: "MTA", awayTeamId: "HTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 27 },
    // Round 28
    { id: "m28-1", homeTeamId: "HPT", awayTeamId: "HTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 28 },
    { id: "m28-2", homeTeamId: "MHF", awayTeamId: "MTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 28 },
    { id: "m28-3", homeTeamId: "HBS", awayTeamId: "BJR", homeGoals: null, awayGoals: null, played: false, gameWeek: 28 },
    // Round 29
    { id: "m29-1", homeTeamId: "MTA", awayTeamId: "HBS", homeGoals: null, awayGoals: null, played: false, gameWeek: 29 },
    { id: "m29-2", homeTeamId: "BJR", awayTeamId: "HPT", homeGoals: null, awayGoals: null, played: false, gameWeek: 29 },
    { id: "m29-3", homeTeamId: "HTA", awayTeamId: "MHF", homeGoals: null, awayGoals: null, played: false, gameWeek: 29 },
    // Round 30
    { id: "m30-1", homeTeamId: "HPT", awayTeamId: "MHF", homeGoals: null, awayGoals: null, played: false, gameWeek: 30 },
    { id: "m30-2", homeTeamId: "HBS", awayTeamId: "HTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 30 },
    { id: "m30-3", homeTeamId: "BJR", awayTeamId: "MTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 30 },
    // Round 31
    { id: "m31-1", homeTeamId: "MTA", awayTeamId: "HPT", homeGoals: null, awayGoals: null, played: false, gameWeek: 31 },
    { id: "m31-2", homeTeamId: "HTA", awayTeamId: "BJR", homeGoals: null, awayGoals: null, played: false, gameWeek: 31 },
    { id: "m31-3", homeTeamId: "MHF", awayTeamId: "HBS", homeGoals: null, awayGoals: null, played: false, gameWeek: 31 },
    // Round 32
    { id: "m32-1", homeTeamId: "HPT", awayTeamId: "HBS", homeGoals: null, awayGoals: null, played: false, gameWeek: 32 },
    { id: "m32-2", homeTeamId: "MHF", awayTeamId: "BJR", homeGoals: null, awayGoals: null, played: false, gameWeek: 32 },
    { id: "m32-3", homeTeamId: "HTA", awayTeamId: "MTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 32 },
    // Round 33
    { id: "m33-1", homeTeamId: "HTA", awayTeamId: "HPT", homeGoals: null, awayGoals: null, played: false, gameWeek: 33 },
    { id: "m33-2", homeTeamId: "BJR", awayTeamId: "HBS", homeGoals: null, awayGoals: null, played: false, gameWeek: 33 },
    { id: "m33-3", homeTeamId: "MTA", awayTeamId: "MHF", homeGoals: null, awayGoals: null, played: false, gameWeek: 33 },
    // Round 34
    { id: "m34-1", homeTeamId: "MHF", awayTeamId: "HPT", homeGoals: null, awayGoals: null, played: false, gameWeek: 34 },
    { id: "m34-2", homeTeamId: "HTA", awayTeamId: "HBS", homeGoals: null, awayGoals: null, played: false, gameWeek: 34 },
    { id: "m34-3", homeTeamId: "MTA", awayTeamId: "BJR", homeGoals: null, awayGoals: null, played: false, gameWeek: 34 },
    // Round 35
    { id: "m35-1", homeTeamId: "HPT", awayTeamId: "BJR", homeGoals: null, awayGoals: null, played: false, gameWeek: 35 },
    { id: "m35-2", homeTeamId: "HBS", awayTeamId: "MTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 35 },
    { id: "m35-3", homeTeamId: "MHF", awayTeamId: "HTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 35 },
    // Round 36
    { id: "m36-1", homeTeamId: "HPT", awayTeamId: "MTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 36 },
    { id: "m36-2", homeTeamId: "BJR", awayTeamId: "HTA", homeGoals: null, awayGoals: null, played: false, gameWeek: 36 },
    { id: "m36-3", homeTeamId: "HBS", awayTeamId: "MHF", homeGoals: null, awayGoals: null, played: false, gameWeek: 36 },

  ],
  currentGameWeek: 27,
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

    simulatedStats.slice(0, TARGET_POS).forEach((stats) => {
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
