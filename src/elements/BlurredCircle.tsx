"use client";

import { motion } from "framer-motion";
import { circleVariants } from "@/utils/motionVariants";

interface BlurredCircleProps {
  delay?: number;
  width?: number;
  height?: number;
  hasAnimated: boolean;
}

function BlurredCircle({
  delay = 0,
  width = 300,
  height = 300,
  hasAnimated,
}: BlurredCircleProps) {
  return (
    <motion.div
      custom={delay}
      variants={circleVariants}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      className="absolute rounded-full bg-white/15 blur-[60px] z-0"
      style={{
        width,
        height,
        left: `calc(50% - ${width / 2}px)`,
      }}
    />
  );
}

export default BlurredCircle;
