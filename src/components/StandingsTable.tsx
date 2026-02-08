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

export default function StandingsTable({
  teams,
  standings,
}: StandingsTableProps) {
  return (
    <Card className="shadow-sm hover-scale transition-all animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-medium tracking-tight flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span>טבלת הליגה</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-8 h-10 px-1 text-center text-sm font-bold sm:px-2">
                #
              </TableHead>
              <TableHead className="h-10 px-1 text-right text-sm font-bold sm:px-2">
                קבוצה
              </TableHead>
              <TableHead className="w-8 h-10 px-1 text-center text-sm font-bold sm:px-2">
                מש׳
              </TableHead>
              <TableHead className="w-8 h-10 px-1 text-center text-sm font-bold sm:px-2">
                +/-
              </TableHead>
              <TableHead className="w-8 h-10 px-1 text-center text-sm font-bold sm:px-2">
                נק׳
              </TableHead>
              <TableHead className="w-20 h-10 px-1 text-center text-sm font-bold sm:px-2 sm:w-24">
                סיכוי
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((stats) => {
              const team = teams.find((t) => t.id === stats.teamId);

              // Determine row styling based on position
              const isTopSix = stats.position && stats.position <= 6;

              return (
                <TableRow
                  key={stats.teamId}
                  className={cn(
                    "transition-colors",
                    isTopSix ? "bg-primary/5" : "",
                  )}
                >
                  <TableCell
                    className={cn(
                      "p-1 text-center text-sm font-bold sm:p-2",
                      isTopSix ? "text-primary" : "",
                    )}
                  >
                    {stats.position}
                  </TableCell>
                  <TableCell className="p-1 text-right sm:p-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0 sm:w-3 sm:h-3"
                        style={{ backgroundColor: team?.color }}
                      ></div>
                      <span className="text-sm font-bold whitespace-nowrap">
                        {team?.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-1 text-center text-sm font-medium sm:p-2">
                    {stats.played}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "p-1 text-center text-sm font-bold sm:p-2",
                      stats.goalDifference > 0
                        ? "text-green-600"
                        : stats.goalDifference < 0
                          ? "text-red-600"
                          : "",
                    )}
                    style={{ direction: "ltr" }}
                  >
                    {stats.goalDifference > 0
                      ? `+${stats.goalDifference}`
                      : stats.goalDifference}
                  </TableCell>
                  <TableCell className="p-1 text-center text-sm font-bold sm:p-2">
                    {stats.points}
                  </TableCell>
                  <TableCell className="p-1 sm:p-2">
                    <div className="relative w-full h-3 bg-secondary rounded-full overflow-hidden sm:h-4">
                      <div
                        className={cn(
                          "absolute top-0 left-0 h-full transition-all duration-500 ease-out",
                          stats.probability && stats.probability >= 99.9
                            ? "bg-green-500"
                            : isTopSix
                              ? "bg-primary"
                              : "bg-muted-foreground/30",
                        )}
                        style={{
                          width: `${Math.max(0, Math.min(100, stats.probability || 0))}%`,
                        }}
                      />
                      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                        <span
                          className={cn(
                            "text-[10px] font-medium sm:text-xs",
                            stats.probability && stats.probability >= 99.9
                              ? "text-white"
                              : "mix-blend-difference text-white",
                          )}
                        >
                          {stats.probability && stats.probability >= 99.9
                            ? "100%"
                            : stats.probability
                              ? `${stats.probability.toFixed(2)}%`
                              : "0.00%"}
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
