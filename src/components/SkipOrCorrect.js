import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          <h1>Skipped</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkipOrCorrect;
