
import { Button } from "@/components/ui/button";
import { useLeague } from "@/contexts/LeagueContext";
import { Trophy, RefreshCw } from "lucide-react";

export default function LeagueHeader() {
  const { resetLeague, currentGameWeek } = useLeague();
  
  return (
    <div className="flex flex-col gap-4 items-center justify-between mb-8 animate-fade-in">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">סימולטור הפלייאוף העליון</h1>
      </div>
      
      <div className="flex justify-between items-center w-full">
        <p className="text-muted-foreground">
        </p>
        
        {/* <Button 
          variant="outline" 
          size="sm"
          className="flex gap-2 items-center" 
          onClick={resetLeague}
        >
          <RefreshCw className="h-4 w-4" />
          איפוס
        </Button> */}
      </div>
    </div>
  );
}
