import MarketList from "@/templates/MarketList";
import TitleOfMarketList from "@/templates/TitleOfMarketList";

function HomePage() {
  return (
    <div className="flex items-center justify-center flex-wrap">
      <TitleOfMarketList />
      <MarketList />
    </div>
  );
}

export default HomePage;
