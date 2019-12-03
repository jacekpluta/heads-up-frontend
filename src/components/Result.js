import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Refresh.scss";
function Result(props) {
  return (
    <AnimatePresence>
      {props.showResult === true && (
        <motion.div
          style={{
            opacity: 0,
            display: "block"
          }}
          className="Result"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 100 }}
          transition={{ delay: 0.2 }}
          exit={{ opacity: 0 }}
          onClick={() => props.refresh()}
        >
          <h1>
            Points: {props.points}
            Questions: {props.questionsResult}
            <div className="reloadSingle"></div>
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Result;
