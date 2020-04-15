import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParStyleCentered } from "../../styles/Layout";

export default function ChangeOrientationBox(props) {
  const pageTransition = {
    inModule: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    outModule: {
      opacity: 0,
      y: -200,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="ChangeOrientationBox"
        variants={pageTransition}
        initial={"outModule"}
        animate={"inModule"}
        exit={"outModule"}
      >
        <ParStyleCentered style={{ fontSize: "10vw" }}>
          PRZYŁÓŻ TELEFON DO CZOŁA
        </ParStyleCentered>
      </motion.div>
    </AnimatePresence>
  );
}
