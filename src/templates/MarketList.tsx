"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import MarketListCard from "@/components/MarketListCard";

type Coin = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
};

type CoinData = {
  HotList: Coin[];
  NewCoins: Coin[];
  TopGainers: Coin[];
  lastUpdated: string;
};

function MarketList() {
  const [coins, setCoins] = useState<CoinData | null>(null);
  const hasFetchedOnce = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { ref, inView } = useInView({ threshold: 0.2 });

  const fetchCoins = async () => {
    try {
      const res = await fetch("/api/coins");
      if (!res.ok) throw new Error("Failed to fetch coins");
      const data: CoinData = await res.json();
      setCoins(data);
      hasFetchedOnce.current = true;
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    if (inView) {
      if (!intervalRef.current) {
        fetchCoins();
        intervalRef.current = setInterval(fetchCoins, 4000);
      }
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="flex justify-between gap-[18px] mx-auto py-[70px]"
    >
      <MarketListCard title="Hot List" HotList coinData={coins?.HotList} />
      <MarketListCard title="New Coins" NewCoins coinData={coins?.NewCoins} />
      <MarketListCard
        title="Top Gainers"
        TopGainers
        coinData={coins?.TopGainers}
      />
    </div>
  );
}

export default MarketList;
