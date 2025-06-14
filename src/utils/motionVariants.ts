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

const containerVariants = {
  initial: { y: 300 },
  animate: {
    y: 0,
    transition: { type: "spring", stiffness: 95, damping: 20 },
  },
};

const itemVariants = {
  animate: {
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
};

const buttonVariants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

  const sliderVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.4 },
    }),
  };

export {
  containerFadeIn,
  textBlurIn,
  sectionFade,
  circleVariants,
  containerVariants,
  itemVariants,
  buttonVariants,
  sliderVariants
};
