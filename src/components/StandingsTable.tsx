
import { Team, TeamStats } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Trophy } from "lucide-react";

interface StandingsTableProps {
  teams: Team[];
  standings: TeamStats[];
}

export default function StandingsTable({ teams, standings }: StandingsTableProps) {
  return (
    <Card className="shadow-sm hover-scale transition-all animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-medium tracking-tight flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span>League Standings</span>
          </CardTitle>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary">
            <BarChart className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Top 2 Probability
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center w-12">P</TableHead>
              <TableHead className="text-center w-12">W</TableHead>
              <TableHead className="text-center w-12">D</TableHead>
              <TableHead className="text-center w-12">L</TableHead>
              <TableHead className="text-center w-12">GF</TableHead>
              <TableHead className="text-center w-12">GA</TableHead>
              <TableHead className="text-center w-12">GD</TableHead>
              <TableHead className="text-center w-12">Pts</TableHead>
              <TableHead className="text-center w-24">Probability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((stats) => {
              const team = teams.find((t) => t.id === stats.teamId);
              const goalDifference = stats.goalsFor - stats.goalsAgainst;
              
              // Determine row styling based on position
              const isTopTwo = stats.position && stats.position <= 2;

              return (
                <TableRow 
                  key={stats.teamId}
                  className={cn(
                    "transition-colors",
                    isTopTwo ? "bg-primary/5" : ""
                  )}
                >
                  <TableCell className={cn(
                    "font-medium",
                    isTopTwo ? "text-primary" : ""
                  )}>
                    {stats.position}
                  </TableCell>
                  <TableCell className="font-medium">
                    {team?.name}
                  </TableCell>
                  <TableCell className="text-center">{stats.played}</TableCell>
                  <TableCell className="text-center">{stats.won}</TableCell>
                  <TableCell className="text-center">{stats.drawn}</TableCell>
                  <TableCell className="text-center">{stats.lost}</TableCell>
                  <TableCell className="text-center">{stats.goalsFor}</TableCell>
                  <TableCell className="text-center">{stats.goalsAgainst}</TableCell>
                  <TableCell className={cn(
                    "text-center font-medium",
                    goalDifference > 0 ? "text-green-600" : 
                    goalDifference < 0 ? "text-red-600" : ""
                  )}>
                    {goalDifference > 0 ? `+${goalDifference}` : goalDifference}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {stats.points}
                  </TableCell>
                  <TableCell>
                    <div className="relative w-full h-4 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "absolute top-0 left-0 h-full transition-all duration-500 ease-out",
                          isTopTwo ? "bg-primary" : "bg-muted-foreground/30"
                        )}
                        style={{ width: `${Math.max(0, Math.min(100, stats.probability || 0))}%` }}
                      />
                      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                        <span className="text-xs font-medium mix-blend-difference text-white">
                          {stats.probability ? `${Math.round(stats.probability)}%` : '0%'}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
