
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

  const [groupBy, setGroupBy] = useState<'round' | 'team'>('round');
  const tabRef = useRef<HTMLButtonElement>(null);

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
            onClick={() => setGroupBy(groupBy === 'round' ? 'team' : 'round')}
            className="text-xs"
          >
            {groupBy === 'round' ? "לפי קבוצות" : "לפי מחזור"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={selectedWeek} 
          onValueChange={handleGameWeekChange}
          className="w-full"
        >
          <TabsList className="w-full flex justify-between " style={{ direction: "rtl"}}>
            {groupBy === 'round' && gameWeeks.map((week) => (
              <TabsTrigger
                key={week}
                value={week.toString()}
                className={cn(
                  week < currentGameWeek ? "text-muted-foreground" : "",
                  week === currentGameWeek ? "font-medium" : ""
                )}
                ref={tabRef}
              >
                {week}
              </TabsTrigger>
            ))}
            {
              groupBy === 'team' && teams.slice(0,4).map((team) => (
                <TabsTrigger
                  key={team.id}
                  value={team.id}
                  className={cn(
                    team.id === selectedWeek ? "font-medium" : ""
                  )}
                >
                  {team.name}
                </TabsTrigger>
              ))
            }

          </TabsList>
          
          {groupBy === 'round' && gameWeeks.map((week) => (
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
              </TabsContent>))
          }
            {
              groupBy === 'team' && teams.slice(0,4).map((team) => (
                <TabsContent key={team.id} value={team.id.toString()} className="pt-2">
                  <div className="space-y-4"  style={{ direction: "rtl"}}>
                  {matches
                    .filter((match) =>(match.homeTeamId === team.id || match.awayTeamId === team.id))
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

              ))
            }
        </Tabs>
      </CardContent>
    </Card>
  );
}
