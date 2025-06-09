"use client";
import { motion } from "framer-motion";
import { containerFadeIn, textBlurIn } from "@/utils/motionVariants";

type Props = {
  hasAnimated: boolean;
};

function DescriptionAnimation({ hasAnimated }: Props) {
  const words = `Want to buy Bitcoin outright or trade CFDs on Gold or EUR/USD?
  We've got you covered with access to 100+ global markets on one platform.`.split(
    " "
  );

  return (
    <motion.div
      variants={containerFadeIn}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      className="flex flex-wrap justify-center gap-x-1 w-[560px] text-sm leading-relaxed text-[#80818A] z-10"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={textBlurIn}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default DescriptionAnimation;
