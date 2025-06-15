"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

import MarketListCard from "@/components/MarketListCard";
import { sliderVariants } from "@/utils/motionVariants";

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

type CardType = {
  title: string;
  prop: "HotList" | "NewCoins" | "TopGainers";
  data: Coin[] | undefined;
};

export default function MarketList(): JSX.Element {
  const [coins, setCoins] = useState<CoinData | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const { ref, inView } = useInView({ threshold: 0.2 });

  const fetchCoins = async () => {
    try {
      const res = await fetch("/api/coins");
      if (!res.ok) throw new Error("Failed to fetch coins");
      const data: CoinData = await res.json();
      setCoins(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (inView && !intervalRef.current) {
      fetchCoins();
      intervalRef.current = setInterval(fetchCoins, 4000);
    } else if (!inView && intervalRef.current) {
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

  const cards: CardType[] = [
    { title: "Hot List", prop: "HotList", data: coins?.HotList },
    { title: "New Coins", prop: "NewCoins", data: coins?.NewCoins },
    { title: "Top Gainers", prop: "TopGainers", data: coins?.TopGainers },
  ];

  const handleNext = () => {
    if (activeIndex < cards.length - 1) {
      setDirection(1);
      setActiveIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex((i) => i - 1);
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -100 && activeIndex < cards.length - 1) {
      setDirection(1);
      setActiveIndex((i) => i + 1);
    } else if (info.offset.x > 100 && activeIndex > 0) {
      setDirection(-1);
      setActiveIndex((i) => i - 1);
    }
  };

  return (
    <div ref={ref} className="w-full h-full">
      <div className="hidden sm:flex justify-center flex-wrap gap-4 py-16">
        <MarketListCard title="Hot List" HotList coinData={coins?.HotList} />
        <MarketListCard title="New Coins" NewCoins coinData={coins?.NewCoins} />
        <MarketListCard
          title="Top Gainers"
          TopGainers
          coinData={coins?.TopGainers}
        />
      </div>

      <div className="sm:hidden relative w-full py-10 flex flex-col items-center">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#76777C] shadow ${
            activeIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
          }`}
          aria-label="Previous"
        >
          <RiArrowLeftSLine color="#DADBDD" />
        </button>

        <button
          onClick={handleNext}
          disabled={activeIndex === cards.length - 1}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#76777C] shadow ${
            activeIndex === cards.length - 1
              ? "opacity-30 cursor-not-allowed"
              : ""
          }`}
          aria-label="Next"
        >
          <RiArrowRightSLine color="#DADBDD" />
        </button>

        <div className="relative w-full min-h-[420px] flex justify-center px-2 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="w-full flex justify-center absolute left-0"
              style={{ willChange: "transform" }}
            >
              <MarketListCard
                title={cards[activeIndex].title}
                {...{ [cards[activeIndex].prop]: true }}
                coinData={cards[activeIndex].data}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {cards.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                i === activeIndex ? "bg-[var(--color-primary)]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
