import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Refresh.scss";
function Result(props) {
  const pStyle = {
    textAlign: "center",
    color: "black",
    width: "100%",
    fontSize: "20px",
    color: "#f8f8ff",
    textShadow: "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15)"
  };

  const reptiles = ["alligator", "snake", "lizard"];
  console.log(props.questionsResult);
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
          <p style={pStyle}>Points: {props.points}</p>
          <p style={pStyle}>Questions: </p>
          <p style={pStyle}>
            <ol>
              {props.questionsResult.map(reptile => (
                <li>{reptile}</li>
              ))}
            </ol>
          </p>
          <h1>
            <div className="reloadSingle"></div>
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Result;
