import { useEffect, useRef, useState } from "react";
import { Match, Team } from "@/lib/types";
import { useLeague } from "@/contexts/LeagueContext";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays } from "lucide-react";
import MatchResult from "./MatchResult";
import { group } from "console";

interface MatchFixturesProps {
  teams: Team[];
  matches: Match[];
  currentGameWeek: number;
}

export default function MatchFixtures({
  teams,
  matches,
  currentGameWeek,
}: MatchFixturesProps) {
  const { simulations, setSimulations } = useLeague();
  const [selectedWeek, setSelectedWeek] = useState<string>(
    currentGameWeek.toString(),
  );

  const gameWeeks = [22, 23, 24, 25, 26];

  // Filter matches by game week
  const matchesForSelectedWeek = matches.filter(
    (match) => match.gameWeek === parseInt(selectedWeek),
  );

  // Handle game week change
  const handleGameWeekChange = (week: string) => {
    setSelectedWeek(week);
  };

  const [groupBy, setGroupBy] = useState<"round" | "team">("round");
  const tabRef = useRef<HTMLButtonElement>(null);

  // Sort teams so Hapoel Petah Tikva is first
  const sortedTeams = [...teams].sort((a, b) => {
    if (a.name.includes("הפועל פתח תקוה") || a.name.includes("הפועל פתח-תקוה"))
      return -1;
    if (b.name.includes("הפועל פתח תקוה") || b.name.includes("הפועל פתח-תקוה"))
      return 1;
    return 0; // Keep original order for others
  });

  return (
    <Card className="shadow-sm hover-scale transition-all animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-medium tracking-tight flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span>משחקים ותוצאות</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (groupBy === "round") {
                setGroupBy("team");
                if (sortedTeams.length > 0) {
                  setSelectedWeek(sortedTeams[0].id);
                }
              } else {
                setGroupBy("round");
                setSelectedWeek(currentGameWeek.toString());
              }
            }}
            className="text-xs"
          >
            {groupBy === "round" ? "לפי קבוצות" : "לפי מחזור"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={selectedWeek}
          onValueChange={handleGameWeekChange}
          className="w-full"
        >
          <TabsList
            className="w-full h-auto flex flex-wrap justify-between gap-1"
            style={{ direction: "rtl" }}
          >
            {groupBy === "round" &&
              gameWeeks.map((week) => (
                <TabsTrigger
                  key={week}
                  value={week.toString()}
                  className={cn(
                    week < currentGameWeek ? "text-muted-foreground" : "",
                    week === currentGameWeek ? "font-medium" : "",
                  )}
                  ref={tabRef}
                >
                  {week}
                </TabsTrigger>
              ))}
            {groupBy === "team" &&
              sortedTeams.map((team) => (
                <TabsTrigger
                  key={team.id}
                  value={team.id}
                  className={cn(team.id === selectedWeek ? "font-medium" : "")}
                >
                  {team.name}
                </TabsTrigger>
              ))}
          </TabsList>

          {groupBy === "round" &&
            gameWeeks.map((week) => (
              <TabsContent key={week} value={week.toString()} className="pt-2">
                <div className="space-y-4" style={{ direction: "rtl" }}>
                  {matches
                    .filter((match) => match.gameWeek === week)
                    .sort((a, b) => {
                      const isAHPT =
                        a.homeTeamId === "HPT" || a.awayTeamId === "HPT";
                      const isBHPT =
                        b.homeTeamId === "HPT" || b.awayTeamId === "HPT";
                      if (isAHPT && !isBHPT) return -1;
                      if (!isAHPT && isBHPT) return 1;
                      return 0;
                    })
                    .map((match) => {
                      const homeTeam = teams.find(
                        (t) => t.id === match.homeTeamId,
                      );
                      const awayTeam = teams.find(
                        (t) => t.id === match.awayTeamId,
                      );

                      return (
                        <MatchResult
                          key={match.id}
                          match={match}
                          homeTeam={homeTeam as Team}
                          awayTeam={awayTeam as Team}
                        />
                      );
                    })}
                </div>
              </TabsContent>
            ))}
          {groupBy === "team" &&
            teams.map((team) => (
              <TabsContent
                key={team.id}
                value={team.id.toString()}
                className="pt-2"
              >
                <div className="space-y-4" style={{ direction: "rtl" }}>
                  {matches
                    .filter(
                      (match) =>
                        match.homeTeamId === team.id ||
                        match.awayTeamId === team.id,
                    )
                    .map((match) => {
                      const homeTeam = teams.find(
                        (t) => t.id === match.homeTeamId,
                      );
                      const awayTeam = teams.find(
                        (t) => t.id === match.awayTeamId,
                      );

                      return (
                        <MatchResult
                          key={match.id}
                          match={match}
                          homeTeam={homeTeam as Team}
                          awayTeam={awayTeam as Team}
                        />
                      );
                    })}
                </div>
              </TabsContent>
            ))}
        </Tabs>

        <div className="text-xs text-muted-foreground mt-4">
          מספר סימולציות:
          <input
            type="number"
            onChange={(e) => setSimulations(e.target.value)}
            defaultValue={10000}
            step={10000}
            min={10000}
            className="w-16 text-center mx-2"
            size={10}
          />
        </div>
      </CardContent>
    </Card>
  );
}
