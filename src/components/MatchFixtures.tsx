
import { useState } from "react";
import { Match, Team } from "@/lib/types";
import { useLeague } from "@/contexts/LeagueContext";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays } from "lucide-react";
import MatchResult from "./MatchResult";

interface MatchFixturesProps {
  teams: Team[];
  matches: Match[];
  currentGameWeek: number;
}

export default function MatchFixtures({ teams, matches, currentGameWeek }: MatchFixturesProps) {
  const { setCurrentGameWeek } = useLeague();
  const [selectedWeek, setSelectedWeek] = useState<string>(currentGameWeek.toString());
  
  // Generate array of game weeks (1 to 7)
  const gameWeeks = Array.from({ length: 7 }, (_, i) => i + 1 + 30);
  
  // Filter matches by game week
  const matchesForSelectedWeek = matches.filter(
    (match) => match.gameWeek === parseInt(selectedWeek)
  );
  
  // Handle game week change
  const handleGameWeekChange = (week: string) => {
    setSelectedWeek(week);
  };

  return (
    <Card className="shadow-sm hover-scale transition-all animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-medium tracking-tight flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span>משחקים ותוצאות</span>
          </CardTitle>
          <div className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            מחזור {selectedWeek} / 37
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={selectedWeek} 
          onValueChange={handleGameWeekChange}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-7 mb-4" style={{ direction: "rtl"}}>
            {gameWeeks.map((week) => (
              <TabsTrigger
                key={week}
                value={week.toString()}
                className={cn(
                  week < currentGameWeek ? "text-muted-foreground" : "",
                  week === currentGameWeek ? "font-medium" : ""
                )}
              >
                {week}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {gameWeeks.map((week) => (
            <TabsContent key={week} value={week.toString()} className="pt-2">
              <div className="space-y-4"  style={{ direction: "rtl"}}>
                {matches
                  .filter((match) => match.gameWeek === week)
                  .map((match) => {
                    const homeTeam = teams.find((t) => t.id === match.homeTeamId);
                    const awayTeam = teams.find((t) => t.id === match.awayTeamId);
                    
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
      </CardContent>
    </Card>
  );
}
