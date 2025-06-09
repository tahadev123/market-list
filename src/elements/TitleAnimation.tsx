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
      className="w-dvw flex justify-center z-10"
    >
      <div className="flex flex-wrap gap-x-2 mb-5 text-white text-[33px] font-bold leading-relaxed">
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
    </motion.div>
  );
}

export default TitleAnimation;
