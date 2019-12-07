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

  const Paragraph = styled.p`
    font-size: 15px;
    text-align: center;
  `;

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
        <Paragraph>{props.currentQuestion}</Paragraph>
      </motion.div>
    </motion.div>
  );
}

Questions.propTypes = {};

export default Questions;