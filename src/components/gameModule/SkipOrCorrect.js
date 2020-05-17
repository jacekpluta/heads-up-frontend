import React from "react";
import { motion } from "framer-motion";

const pStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#f8f8ff",
  fontSize: "14vh",
  fontWeight: 700,
  textAlign: "center",
  width: "100%",
  textShadow: "5px 5px 10px #474747",
};

const pageTransition = {
  inModule: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  outModule: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const SkipOrCorrect = (props) => {
  const { skippedAnswer, correctAnswer } = props;

  return (
    <React.Fragment>
      {/* SKIPPED ANSWER */}

      <motion.div
        className="skiporcorrect"
        variants={pageTransition}
        initial={skippedAnswer ? "inModule" : "outModule"}
        animate={skippedAnswer ? "outModule" : "inModule"}
      >
        <p style={pStyle}>SKIPPED</p>
      </motion.div>
      {/* CORRECT ANSWER */}
      <motion.div
        className="skiporcorrect"
        style={{
          background:
            "linear-gradient(180deg, rgb(7, 255, 48), rgb(2, 255, 171))",
        }}
        variants={pageTransition}
        initial={correctAnswer ? "inModule" : "outModule"}
        animate={correctAnswer ? "outModule" : "inModule"}
      >
        <p style={pStyle}>CORRECT</p>
      </motion.div>
    </React.Fragment>
  );
};

export default SkipOrCorrect;
