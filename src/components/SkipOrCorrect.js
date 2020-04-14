import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const pStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#f8f8ff",
  fontSize: "12vh",
  fontWeight: 700,
  textAlign: "center",
  width: "100%",
  textShadow: "5px 5px 10px #474747",
};

const pageTransition = {
  inModule: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  outModule: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const SkipOrCorrect = (props) => {
  const { skippedAnswer, correctAnswer } = props;

  return (
    <React.Fragment>
      <motion.div
        className="SkipCorrect"
        variants={pageTransition}
        initial={"inModule"}
        animate={skippedAnswer ? "outModule" : "inModule"}
        exit={skippedAnswer ? "inModule" : "outModule"}
      >
        <p style={pStyle}>POMINIĘTE</p>
      </motion.div>

      <motion.div
        className="SkipCorrect"
        style={{
          background:
            "linear-gradient(180deg, rgb(7, 255, 48), rgb(2, 255, 171))",
        }}
        variants={pageTransition}
        initial={"inModule"}
        animate={correctAnswer ? "outModule" : "inModule"}
        exit={correctAnswer ? "inModule" : "outModule"}
      >
        <p style={pStyle}>DOBRZE</p>
      </motion.div>
    </React.Fragment>
  );
};

export default SkipOrCorrect;
