
import React, { createContext, useContext, useState, useEffect } from "react";
import { initialData, calculateTeamStats, calculateProbabilities } from "@/lib/data";
import { LeagueData, Match, MatchOutcome, Team, TeamStats } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";

interface LeagueContextType {
  teams: Team[];
  matches: Match[];
  teamStats: TeamStats[];
  currentGameWeek: number;
  updateMatchResult: (outcome: MatchOutcome) => void;
  setCurrentGameWeek: (week: number) => void;
  resetLeague: () => void;
  simulations: number;
  setSimulations: (simulations: number) => void;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export function LeagueProvider({ children }: { children: React.ReactNode }) {
  const [leagueData, setLeagueData] = useState<LeagueData>(initialData);
  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
  const [simulations, setSimulations] = useState<number>(10000);

  useEffect(() => {
    // Calculate initial standings with probabilities
    const stats = calculateProbabilities(
      leagueData.teams, 
      leagueData.matches,
      leagueData.currentGameWeek,
      simulations
    );
    setTeamStats(stats);
  }, [leagueData, simulations]);

  const updateMatchResult = (outcome: MatchOutcome) => {
    const { matchId, homeGoals, awayGoals } = outcome;
    
    setLeagueData((prevData) => {
      const updatedMatches = prevData.matches.map((match) => {
        if (match.id === matchId) {          
          return {
            ...match,
            homeGoals,
            awayGoals,            
          };
        }
        return match;
      });

      return {
        ...prevData,
        matches: updatedMatches,
      };
    });
  };

  const setCurrentGameWeek = (week: number) => {
    setLeagueData((prevData) => ({
      ...prevData,
      currentGameWeek: week,
    }));
  };

  const resetLeague = () => {
    setLeagueData(initialData);
    toast({
      title: "איפוס הושלם",      
    });
  };

  return (
    <LeagueContext.Provider
      value={{
        teams: leagueData.teams,
        matches: leagueData.matches,
        teamStats,
        currentGameWeek: leagueData.currentGameWeek,
        updateMatchResult,
        setCurrentGameWeek,
        resetLeague,
        simulations,
        setSimulations
      }}
    >
      {children}
    </LeagueContext.Provider>
  );
}

export function useLeague() {
  const context = useContext(LeagueContext);
  if (context === undefined) {
    throw new Error("useLeague must be used within a LeagueProvider");
  }
  return context;
}
