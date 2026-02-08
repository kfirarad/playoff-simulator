import { Button } from "@/components/ui/button";
import { useLeague } from "@/contexts/LeagueContext";
import { Trophy, RefreshCw, Dices } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function LeagueHeader() {
  const { resetLeague, randomizeLeague, useWeighted, setUseWeighted } =
    useLeague();

  return (
    <div className="flex flex-col gap-4 items-center justify-between mb-8 animate-fade-in">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          סימולטור העונה הסדירה 25/26
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
        <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-lg border border-border/50">
          <Switch
            id="weighted-mode"
            checked={useWeighted}
            onCheckedChange={(checked) => {
              trackEvent("toggle_weighted_mode", { enabled: checked });
              setUseWeighted(checked);
            }}
          />
          <Label
            htmlFor="weighted-mode"
            className="cursor-pointer font-medium text-sm flex flex-col"
          >
            <span>התחשב במאזני הכוחות</span>
            <span className="text-[10px] text-muted-foreground font-normal">
              {useWeighted
                ? "הסיכויים מושפעים מחוזק הקבוצה"
                : "סיכויים אקראיים לחלוטין (50/50)"}
            </span>
          </Label>
        </div>

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
