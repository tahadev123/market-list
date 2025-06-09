const containerFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.07 },
  },
};

const textBlurIn = {
  hidden: { opacity: 0, y: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const sectionFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const circleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.7, ease: "easeOut" },
  }),
};

export { containerFadeIn, textBlurIn, sectionFade, circleVariants };
