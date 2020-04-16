import React from "react";
import { motion } from "framer-motion";
import { ParStyleCentered } from "../../styles/Layout";

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
      <ParStyleCentered style={{ fontSize: "10vw" }}>
        PRZYŁÓŻ TELEFON DO CZOŁA
      </ParStyleCentered>
    </motion.div>
  );
}
