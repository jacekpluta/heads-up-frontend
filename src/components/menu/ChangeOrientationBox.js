import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParStyle } from "../../styles/Layout";

export default function ChangeOrientationBox(props) {
  const pageTransition = {
    inModule: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
    outModule: {
      opacity: 0,
      x: -200,
      transition: {
        duration: 1,
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
        <ParStyle style={{ marginTop: "44vh", fontSize: "7vw" }}>
          Please rotate your device
        </ParStyle>
      </motion.div>
    </AnimatePresence>
  );
}
