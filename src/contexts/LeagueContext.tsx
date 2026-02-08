import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initialData,
  calculateTeamStats,
  calculateProbabilities,
  dataHash,
} from "@/lib/data";
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
  randomizeLeague: () => void;
  simulations: number;
  setSimulations: (simulations: number) => void;
  useWeighted: boolean;
  setUseWeighted: (use: boolean) => void;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export function LeagueProvider({ children }: { children: React.ReactNode }) {
  const [leagueData, setLeagueData] = useState<LeagueData>(() => {
    const saved = localStorage.getItem("leagueData");
    const savedHash = localStorage.getItem("dataHash");

    if (saved && savedHash === dataHash) {
      return JSON.parse(saved);
    }
    return initialData;
  });
  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
  const [simulations, setSimulations] = useState<number>(10000);
  const [useWeighted, setUseWeighted] = useState<boolean>(false);

  useEffect(() => {
    const savedHash = localStorage.getItem("dataHash");
    if (savedHash !== dataHash) {
      localStorage.setItem("dataHash", dataHash);
      if (savedHash) {
        toast({
          title: "התוצאות עודכנו",
          description: "הנתונים אותחלו כדי להסתנכרן עם התוצאות האחרונות",
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("leagueData", JSON.stringify(leagueData));
    localStorage.setItem("dataHash", dataHash);

    // Calculate initial standings with probabilities
    const stats = calculateProbabilities(
      leagueData.teams,
      leagueData.matches,
      leagueData.currentGameWeek,
      simulations,
      useWeighted,
    );
    setTeamStats(stats);
  }, [leagueData, simulations, useWeighted]);

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
    localStorage.removeItem("leagueData");
    toast({
      title: "איפוס הושלם",
    });
  };

  const randomizeLeague = () => {
    setLeagueData((prevData) => {
      const unplayedMatches = prevData.matches.filter((m) => !m.played);
      const allUnplayedFilled = unplayedMatches.every(
        (match) => match.homeGoals !== null && match.awayGoals !== null,
      );

      const updatedMatches = prevData.matches.map((match) => {
        if (match.played) return match;

        if (
          allUnplayedFilled ||
          match.homeGoals === null ||
          match.awayGoals === null
        ) {
          return {
            ...match,
            homeGoals: Math.floor(Math.random() * 4), // Random 0-3
            awayGoals: Math.floor(Math.random() * 4), // Random 0-3
          };
        }
        return match;
      });

      return {
        ...prevData,
        matches: updatedMatches,
      };
    });
    toast({ title: "תוצאות הוגרלו" });
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
        randomizeLeague, // Add to context
        simulations,
        setSimulations,
        useWeighted,
        setUseWeighted,
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
