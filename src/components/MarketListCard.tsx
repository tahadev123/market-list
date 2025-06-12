"use client";

import { motion } from "framer-motion";
import MarketListLoader from "@/elements/MarketListLoader";
import CoinCard from "@/elements/CoinCard";
import { containerVariants, itemVariants } from "@/utils/motionVariants";

import { MdOutlineWhatshot } from "react-icons/md";
import { TiStarOutline } from "react-icons/ti";
import { FaArrowTrendUp } from "react-icons/fa6";

type Coin = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
};

type Props = {
  HotList?: boolean;
  NewCoins?: boolean;
  TopGainers?: boolean;
  title: string;
  coinData?: Coin[];
};

function MarketListCard({
  HotList,
  NewCoins,
  TopGainers,
  title,
  coinData,
}: Props) {
  const icon = HotList ? (
    <MdOutlineWhatshot className="mr-2" />
  ) : NewCoins ? (
    <TiStarOutline className="mr-2" />
  ) : TopGainers ? (
    <FaArrowTrendUp className="mr-2" />
  ) : null;

  return (
    <div className="w-[340px] h-[390px] bg-[#181921] rounded-2xl overflow-hidden border border-[#ccc]/10 py-5 relative">
      <span className="flex items-center w-fit bg-[#0F1118] text-[var(--color-primary)] text-sm px-3 py-1 mb-5 ml-5 rounded-full">
        {icon}
        {title}
      </span>

      {!coinData ? (
        <MarketListLoader />
      ) : (
        <motion.div
          layout
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="overflow-hidden"
        >
          <div className="flex flex-col gap-2">
            {coinData
              .sort((a, b) => b.current_price - a.current_price)
              .map((coin) => (
                <motion.div key={coin.id} layout variants={itemVariants}>
                  <CoinCard data={coin} />
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default MarketListCard;
