import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Refresh.scss";

function Result(props) {
  const pStyle = {
    textAlign: "center",
    width: "100%",
    fontSize: "20px",
    color: "#f8f8ff",
    textShadow: "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15)"
  };

  const olStyle = {
    textAlign: "center",
    width: "100%",
    fontSize: "20px",
    color: "#f8f8ff",
    textShadow: "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15)"
  };
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
          onClick={() => props.handleGameRefresh()}
        >
          <p style={pStyle}>Points: {props.points}</p>
          <p style={pStyle}>Questions: </p>

          <ol style={olStyle}>
            {props.questionsResult.map((question, key) => (
              <li key={key}>
                {console.log(question)}
                {question}
              </li>
            ))}
          </ol>

          <h1>
            <div className="reloadSingle"></div>
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Result;
