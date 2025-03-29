
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
import { Trophy } from "lucide-react";

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
            <span>טבלת הפלייאוף</span>
          </CardTitle>

        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead></TableHead>
              <TableHead className="text-center w-12">מש׳</TableHead>
              <TableHead className="text-center w-12">+/-</TableHead>
              <TableHead className="text-center w-12">נק׳</TableHead>
              <TableHead className="text-center w-24">סיכוי עליה</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((stats) => {
              const team = teams.find((t) => t.id === stats.teamId);              
              
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
                  <TableCell className={cn(
                    "text-center font-medium",
                    stats.goalDifference > 0 ? "text-green-600" : 
                    stats.goalDifference < 0 ? "text-red-600" : ""
                  )} style={{direction: 'ltr'}}>
                    {stats.goalDifference > 0 ? `+${stats.goalDifference}` : stats.goalDifference}
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
                          {stats.probability ? `${stats.probability.toFixed(2)}%` : '0.00%'}
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
