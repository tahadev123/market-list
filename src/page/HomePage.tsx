import MarketList from "@/templates/MarketList";
import TitleOfMarketList from "@/templates/TitleOfMarketList";

function HomePage() {
  return (
    <>
      <div className="h-[600px]"></div>
      <div className="flex items-center flex-wrap">
        <TitleOfMarketList />
        <MarketList />
      </div>
    </>
  );
}

export default HomePage;
