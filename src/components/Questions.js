import React, { useRef } from "react";
import styled from "styled-components";

import { motion, useMotionValue, useTransform } from "framer-motion";
function Questions(props) {
  const pageTransition = {
    inBox: {
      opacity: 1
    },
    outBox: {
      opacity: 0
    }
  };
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 0, 200], [-45, 0, 45], {
    clamp: false
  });

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

  return (
    <motion.div
      id="countdown"
      style={{ display: props.showDivCounterTimer ? "none" : "block" }}
      variants={pageTransition}
      initial={props.showDivCounterTimer ? "inBox" : "outBox"}
      animate={props.showDivCounterTimer ? "outBox" : "inBox"}
      exit={props.showDivCounterTimer ? "inBox" : "outBox"}
      ref={constraintsRef}
      style={rotateY}
    >
      <motion.div drag="x" dragConstraints={constraintsRef} style={{ x }}>
        <p style={pStyle}>{props.currentQuestion}</p>
      </motion.div>
    </motion.div>
  );
}

Questions.propTypes = {};

export default Questions;
