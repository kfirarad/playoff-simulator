import { Button } from "@/components/ui/button";
import { useLeague } from "@/contexts/LeagueContext";
import { Trophy, RefreshCw, Dices } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function LeagueHeader() {
  const { resetLeague, randomizeLeague, currentGameWeek } = useLeague();

  return (
    <div className="flex flex-col gap-4 items-center justify-between mb-8 animate-fade-in">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          סימולטור העונה הסדירה 25/26
        </h1>
      </div>

      <div className="flex justify-between items-center w-full">
        <p className="text-muted-foreground"></p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex gap-2 items-center"
            onClick={() => {
              trackEvent("randomize_league");
              randomizeLeague();
            }}
          >
            <Dices className="h-4 w-4" />
            הגרל תוצאות
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex gap-2 items-center"
            onClick={() => {
              trackEvent("reset_league");
              resetLeague();
            }}
          >
            <RefreshCw className="h-4 w-4" />
            איפוס
          </Button>
        </div>
      </div>
    </div>
  );
}
