import { LeagueData, Match, Team, TeamStats } from "./types";

export const initialData: LeagueData = {
  teams: [
    { id: "t1", name: "Arsenal", shortName: "ARS" },
    { id: "t2", name: "Chelsea", shortName: "CHE" },
    { id: "t3", name: "Liverpool", shortName: "LIV" },
    { id: "t4", name: "Manchester City", shortName: "MCI" },
    { id: "t5", name: "Manchester United", shortName: "MUN" },
    { id: "t6", name: "Tottenham", shortName: "TOT" },
    { id: "t7", name: "Newcastle", shortName: "NEW" },
    { id: "t8", name: "Leicester", shortName: "LEI" },
  ],
  matches: generateMatches(),
  currentGameWeek: 1,
};

function generateMatches(): Match[] {
  const teamIds = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"];
  const matches: Match[] = [];
  let matchId = 1;

  // Generate a round-robin tournament schedule
  // For n teams, we need (n-1) game weeks
  // Each game week has n/2 matches
  for (let gameWeek = 1; gameWeek <= 7; gameWeek++) {
    // For game week scheduling, we'll use circle method
    // Keep first team fixed, rotate others
    const rotatedTeams = [
      teamIds[0],
      ...rotateArray(teamIds.slice(1), (gameWeek - 1) % (teamIds.length - 1)),
    ];

    for (let i = 0; i < teamIds.length / 2; i++) {
      const homeTeamId = rotatedTeams[i];
      const awayTeamId = rotatedTeams[teamIds.length - 1 - i];

      matches.push({
        id: `m${matchId++}`,
        homeTeamId,
        awayTeamId,
        homeGoals: null,
        awayGoals: null,
        played: false,
        gameWeek,
      });
    }
  }

  return matches;
}

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
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    };
  });

  // Update stats based on played matches
  matches.forEach((match) => {
    if (!match.played || match.homeGoals === null || match.awayGoals === null) return;

    const homeStats = stats[match.homeTeamId];
    const awayStats = stats[match.awayTeamId];

    // Update home team stats
    homeStats.played += 1;
    homeStats.goalsFor += match.homeGoals;
    homeStats.goalsAgainst += match.awayGoals;

    // Update away team stats
    awayStats.played += 1;
    awayStats.goalsFor += match.awayGoals;
    awayStats.goalsAgainst += match.homeGoals;

    // Update win/draw/loss and points
    if (match.homeGoals > match.awayGoals) {
      homeStats.won += 1;
      homeStats.points += 3;
      awayStats.lost += 1;
    } else if (match.homeGoals < match.awayGoals) {
      awayStats.won += 1;
      awayStats.points += 3;
      homeStats.lost += 1;
    } else {
      homeStats.drawn += 1;
      homeStats.points += 1;
      awayStats.drawn += 1;
      awayStats.points += 1;
    }
  });

  // Convert to array and sort by points (then goal difference, then goals scored)
  const statsArray = Object.values(stats);
  statsArray.sort((a, b) => {
    // Sort by points (descending)
    if (b.points !== a.points) return b.points - a.points;
    
    // If points are equal, sort by goal difference (descending)
    const aGoalDiff = a.goalsFor - a.goalsAgainst;
    const bGoalDiff = b.goalsFor - b.goalsAgainst;
    if (bGoalDiff !== aGoalDiff) return bGoalDiff - aGoalDiff;
    
    // If goal difference is equal, sort by goals scored (descending)
    return b.goalsFor - a.goalsFor;
  });

  // Assign positions
  statsArray.forEach((stats, index) => {
    stats.position = index + 1;
  });

  return statsArray;
}

export function calculateProbabilities(
  teams: Team[], 
  currentMatches: Match[],
  currentGameWeek: number
): TeamStats[] {
  const simulations = 1000;
  const topPositionCounts: { [key: string]: number } = {};
  
  // Initialize counts
  teams.forEach((team) => {
    topPositionCounts[team.id] = 0;
  });

  // Run simulations
  for (let i = 0; i < simulations; i++) {
    // Clone current matches
    const simulatedMatches = JSON.parse(JSON.stringify(currentMatches)) as Match[];
    
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
    
    // Count teams finishing in top 2
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
}
