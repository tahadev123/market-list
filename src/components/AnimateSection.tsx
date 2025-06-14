"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import DescriptionAnimation from "@/elements/DescriptionAnimation";
import TitleAnimation from "@/elements/TitleAnimation";
import BlurredCircle from "@/elements/BlurredCircle";
import { sectionFade } from "@/utils/motionVariants";

function AnimateSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);

  return (
    <div ref={ref} className="px-4 sm:px-0">
      <motion.div
        variants={sectionFade}
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        className="w-full max-w-[600px] mx-auto flex flex-wrap items-center justify-center relative"
      >
        <TitleAnimation hasAnimated={hasAnimated} />
        <DescriptionAnimation hasAnimated={hasAnimated} />
        <BlurredCircle
          delay={2}
          hasAnimated={hasAnimated}
        />
      </motion.div>
    </div>
  );
}

export default AnimateSection;
