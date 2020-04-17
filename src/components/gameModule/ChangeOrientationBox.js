import React from "react";
import { motion } from "framer-motion";
import { ParStyle } from "../../styles/Layout";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: { opacity: 0, x: "100vw" },
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
      exit="out"
    >
      <ParStyle style={{ fontSize: "10vw" }}>PRZYŁÓŻ TELEFON DO CZOŁA</ParStyle>
    </motion.div>
  );
}
