import React from "react";
import { motion } from "framer-motion";
function Result(props) {
  return (
    <motion.div
      id="Result"
      style={{ display: props.showResult ? "block" : "none" }}
      initial={{ x: "-100vh" }}
      animate={{ x: 0 }}
    >
      > Points: {props.points}
      Questions: {props.questionsResult}
    </motion.div>
  );
}

export default Result;
