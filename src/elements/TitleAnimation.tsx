"use client";
import { motion } from "framer-motion";
import { generateRandomDelays } from "@/utils/generateRandomDelays";

type Props = {
  hasAnimated: boolean;
};

function TitleAnimation({ hasAnimated }: Props) {
  const words = "TRADE YOUR FAVOURITE MARKETS".split(" ");
  const delays = generateRandomDelays(words.length);

  return (
    <motion.div
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      className="w-full max-w-screen-sm flex justify-center z-10 px-4"
    >
      <div className="w-full flex justify-center z-10">
        <div className="flex flex-wrap gap-x-1 mb-5 text-white text-center font-bold leading-relaxed text-[20px] sm:text-[33px]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 2, filter: "blur(4px)" }}
              animate={
                hasAnimated
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0 }
              }
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: delays[i],
              }}
              className={i === 0 ? "text-[var(--color-secondary)]" : ""}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default TitleAnimation;
