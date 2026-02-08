import { useEffect, useState } from "react";
import { Match, Team } from "@/lib/types";
import { useLeague } from "@/contexts/LeagueContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface MatchResultProps {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
}

export default function MatchResult({
  match,
  homeTeam,
  awayTeam,
}: MatchResultProps) {
  const { updateMatchResult } = useLeague();

  // Local state for input values
  const [homeGoals, setHomeGoals] = useState<number | null>(match.homeGoals);
  const [awayGoals, setAwayGoals] = useState<number | null>(match.awayGoals);

  // Sync state with props when match updates (e.g. reset/randomize)
  useEffect(() => {
    setHomeGoals(match.homeGoals);
    setAwayGoals(match.awayGoals);
  }, [match.homeGoals, match.awayGoals]);

  const isPlayed = match.played;

  // Determine match result text and styling
  let resultText = "";
  let resultClass = "";

  if (match.played && match.homeGoals !== null && match.awayGoals !== null) {
    if (match.homeGoals > match.awayGoals) {
      resultText = "Home Win";
      resultClass = "text-green-600";
    } else if (match.homeGoals < match.awayGoals) {
      resultText = "Away Win";
      resultClass = "text-red-600";
    } else {
      resultText = "Draw";
      resultClass = "text-amber-600";
    }
  }

  const handleScoreChange = (team: "home" | "away", value: string) => {
    const numValue = parseInt(value);
    if (value === "" || isNaN(numValue)) {
      if (team === "home") {
        setHomeGoals(0);
      } else {
        setAwayGoals(0);
      }
    } else {
      const goals = Math.max(0, Math.min(99, numValue)); // Limit between 0-99
      if (team === "home") {
        setHomeGoals(goals);
        if (awayGoals === null) {
          setAwayGoals(0);
        }
      } else {
        setAwayGoals(goals);
        if (homeGoals === null) {
          setHomeGoals(0);
        }
      }
    }
  };

  useEffect(() => {
    if (homeGoals !== null && awayGoals !== null) {
      if (match.homeGoals !== homeGoals || match.awayGoals !== awayGoals) {
        trackEvent("update_match_result", {
          match_id: match.id,
          home_team: homeTeam.name,
          away_team: awayTeam.name,
          score: `${homeGoals}-${awayGoals}`,
        });
      }

      updateMatchResult({
        matchId: match.id,
        homeGoals,
        awayGoals,
      });
    }
  }, [homeGoals, awayGoals]);

  console.log("played", match.played);

  return (
    <div
      className={cn(
        "p-4 rounded-lg border transition-all duration-300 animate-slide-up",
        match.played ? "bg-white shadow-sm" : "bg-secondary/50",
        !isPlayed ? "border-primary/20 shadow-sm" : "border-transparent",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-[1fr_80px_1fr] w-full gap-10 items-center">
          {/* Home Team */}
          <div className="text-right flex justify-end items-center">
            <span
              className="px-3 py-1 rounded-full text-sm font-bold cursor-pointer transition-all hover:scale-105 shadow-sm inline-block"
              style={{
                backgroundColor: homeTeam.color,
                color: homeTeam.textColor,
                border: `1px solid ${homeTeam.color}cc`,
              }}
              onClick={() => {
                setAwayGoals(awayGoals === null ? 0 : awayGoals);
                setHomeGoals(homeGoals === null ? awayGoals + 1 : homeGoals);
              }}
            >
              {homeTeam.name}
            </span>
          </div>

          <div className="flex justify-center items-center">
            {!isPlayed ? (
              <div className="flex gap-1 items-center">
                <Input
                  type="number"
                  min={0}
                  max={9}
                  value={homeGoals === null ? "" : homeGoals}
                  onChange={(e) => handleScoreChange("home", e.target.value)}
                  className="w-12 text-center p-1 h-8 bg-white border-primary/20"
                />
                <span
                  className="text-muted-foreground font-bold"
                  onClick={() => {
                    setHomeGoals(1);
                    setAwayGoals(1);
                  }}
                >
                  -
                </span>
                <Input
                  type="number"
                  min={0}
                  max={9}
                  value={awayGoals === null ? "" : awayGoals}
                  onChange={(e) => handleScoreChange("away", e.target.value)}
                  className="w-12 text-center p-1 h-8 bg-white border-primary/20"
                />
              </div>
            ) : (
              <div
                className="text-xl font-bold flex items-center gap-2"
                onClick={() => {
                  setHomeGoals(homeGoals === null ? 0 : homeGoals);
                  setAwayGoals(awayGoals === null ? homeGoals : awayGoals);
                }}
              >
                <span>{match.homeGoals ?? "-"}</span>
                <span className="text-muted-foreground text-sm opacity-50">
                  :
                </span>
                <span>{match.awayGoals ?? "-"}</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="text-left flex items-center">
            <span
              className="px-3 py-1 rounded-full text-sm font-bold cursor-pointer transition-all hover:scale-105 shadow-sm inline-block"
              style={{
                backgroundColor: awayTeam.color,
                color: awayTeam.textColor,
                border: `1px solid ${awayTeam.color}cc`,
              }}
              onClick={() => {
                setHomeGoals(homeGoals === null ? 0 : homeGoals);
                setAwayGoals(awayGoals === null ? homeGoals + 1 : awayGoals);
              }}
            >
              {awayTeam.name}
            </span>
          </div>
        </div>
      </div>

      {/* Result Label (when match is played) */}
      {/* {match.played && !isEditing && (
        <div className="mt-2 flex justify-center">
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full bg-secondary", resultClass)}>
            {resultText}
          </span>
        </div>
      )} */}
    </div>
  );
}
