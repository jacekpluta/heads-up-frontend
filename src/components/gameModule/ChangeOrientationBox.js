import React from "react";
import { motion } from "framer-motion";
import { ParStyle } from "../../styles/Layout";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 1,
};

export default function ChangeOrientationBox(props) {
  return (
    <motion.div
      className="ChangeOrientationBox"
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
    >
      <ParStyle style={{ fontSize: "10vw" }}>PLACE ON FOREHEAD</ParStyle>
    </motion.div>
  );
}
