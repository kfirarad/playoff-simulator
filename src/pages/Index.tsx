
import { LeagueProvider, useLeague } from "@/contexts/LeagueContext";
import StandingsTable from "@/components/StandingsTable";
import MatchFixtures from "@/components/MatchFixtures";
import LeagueHeader from "@/components/LeagueHeader";

const LeagueDashboard = () => {
  const { teams, matches, teamStats, currentGameWeek } = useLeague();

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <LeagueHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StandingsTable teams={teams} standings={teamStats} />
        <MatchFixtures 
          teams={teams} 
          matches={matches} 
          currentGameWeek={currentGameWeek}
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LeagueProvider>
        <LeagueDashboard />
      </LeagueProvider>
    </div>
  );
};

export default Index;
