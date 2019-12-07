import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const pStyle = {
  textAlign: "center",
  color: "black",
  width: "100%",
  marginTop: "25%",
  fontSize: "120px",
  color: "#f8f8ff",
  textShadow:
    "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15), 0 24px 2px rgba(0,0,0,0.1), 0 34px 30px rgba(0,0,0,0.1)"
};

const SkipOrCorrect = props => {
  return (
    <AnimatePresence>
      {props.stopDivCounterTimer === false && (
        <motion.div
          style={{
            opacity: 0,
            display: "block"
          }}
          className="Skip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p style={pStyle}>SKIPPED</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkipOrCorrect;
