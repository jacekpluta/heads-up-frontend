import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const pStyle = {
  position: "absolute",
  top: "42%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#f8f8ff",
  fontSize: "10vh",
  textShadow:
    "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15), 0 24px 2px rgba(0,0,0,0.1), 0 34px 30px rgba(0,0,0,0.1)",
  fontWeight: 700,
};

const SkipOrCorrect = (props) => {
  return (
    <AnimatePresence>
      {props.skippedAnswer && (
        <motion.div
          style={{
            opacity: 0,
            display: "block",
          }}
          className="Skip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p style={pStyle}>SKIPPED</p>
        </motion.div>
      )}

      {props.correctAnswer && (
        <motion.div
          style={{
            opacity: 0,
            display: "block",
          }}
          className="Correct"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p style={pStyle}>CORRECT</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkipOrCorrect;
