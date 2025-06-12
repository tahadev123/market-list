"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { formatSubZeroPrice } from "@/utils/formatSubZeroPrice";
import { buttonVariants } from "@/utils/motionVariants";

import { RiExchangeLine } from "react-icons/ri";

type Coin = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
};

type Props = {
  data: Coin;
};

function CoinCard({ data }: Props) {
  const {
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h: price_percentage,
  } = data;

  const cardRef = useRef<HTMLDivElement>(null);
  const [btnPos, setBtnPos] = useState<{ top: number; left: number } | null>(
    null
  );
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const isHovered = isCardHovered || isBtnHovered;

  useEffect(() => {
    const updateBtn = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setBtnPos({
          top: rect.top + window.scrollY + rect.height / 3 - 12,
          left: rect.right + window.scrollX - 6,
        });
      }
    };

    updateBtn();
    window.addEventListener("scroll", updateBtn);
    window.addEventListener("resize", updateBtn);
    return () => {
      window.removeEventListener("scroll", updateBtn);
      window.removeEventListener("resize", updateBtn);
    };
  }, []);

  useEffect(() => {
    if (isHovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setBtnPos({
        top: rect.top + window.scrollY + rect.height / 2 - 14,
        left: rect.right + window.scrollX - 13,
      });
    }
  }, [isHovered]);

  const priceColor =
    price_percentage > 0
      ? "text-[var(--color-green)]"
      : "text-[var(--color-red)]";

  return (
    <>
      <div
        ref={cardRef}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setTimeout(() => setIsCardHovered(false), 50)}
        className={`group relative flex justify-between items-center transition-all duration-300 py-[7px] px-[20px] cursor-pointer ${
          isHovered ? "bg-[#0B0D13]" : ""
        }`}
      >
        <div className="flex items-center">
          <Image
            src={image}
            alt="coinIcon"
            width={33}
            height={33}
            className="mr-[12px]"
          />
          <p className="text-sm">{name}</p>
          <span className="text-[#ccc]/40 ml-[5px] text-sm">
            ({symbol.toUpperCase()}USDT)
          </span>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-sm">{formatSubZeroPrice(current_price)}</p>
          <span className={`text-sm ${priceColor}`}>
            {`${price_percentage > 0 ? "+" : ""}${price_percentage.toFixed(
              2
            )}%`}
          </span>
        </div>
      </div>

      {typeof window !== "undefined" &&
        btnPos &&
        createPortal(
          <AnimatePresence>
            {isHovered && (
              <motion.button
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                style={{
                  position: "absolute",
                  top: btnPos.top,
                  left: btnPos.left,
                  transform: "translateY(-50%)",
                  zIndex: 9999,
                }}
                className="w-[27px] h-[28px] bg-[var(--color-primary)] transition-colors text-white rounded-md text-sm cursor-pointer hover:bg-[#6b68b4]"
              >
                <RiExchangeLine className="w-[25px] h-[25px] m-auto" />
              </motion.button>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export default CoinCard;
