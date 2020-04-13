import React from "react";
import { motion } from "framer-motion";
import { ParStyleCentered } from "../../styles/Layout";

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

  const textTransition = {
    inModule: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
    outModule: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 1,
      },
    },
  };

  return (
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
  );
}
