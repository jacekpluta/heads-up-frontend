import React, { useState } from "react";
import { motion } from "framer-motion";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)"
  }
};

function BackButton(props) {
  return (
    <motion.div
      className="BackButtonContainer"
      onHoverStart={() => console.log("Hover starts")}
      whileHover={{ scale: 1.2, transition: { duration: 1 } }}
      whileTap={{ scale: 0.8, transition: { duration: 1 } }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="33 4 1 50 "
        className="BackButton"
      >
        <motion.path
          d="M 30 60 Q 30 60 60 40 Q 60 50 60 50 L 100 50 L 100 70 L 60 70 L 60 80 L 30 60"
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut" },
            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
          }}
        />
      </motion.svg>
    </motion.div>
  );
}
export default BackButton;
