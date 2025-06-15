"use client";

import { motion } from "framer-motion";
import { circleVariants } from "@/utils/motionVariants";

interface BlurredCircleProps {
  delay?: number;
  hasAnimated: boolean;
}

function BlurredCircle({
  delay = 0,
  hasAnimated,
}: BlurredCircleProps) {
  return (
    <motion.div
      custom={delay}
      variants={circleVariants}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      className={`
        absolute rounded-full bg-white/15 blur-[30px] z-0
        w-[170px] h-[80px] left-[calc(50%-90px)]
        sm:w-[360px] sm:h-[180px] sm:left-[calc(50%-180px)]
      `}
    />
  );
}

export default BlurredCircle;
