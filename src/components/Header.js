import React from "react";
import { motion } from "framer-motion";
import { HeaderStyle } from "../styles/Layout";

function Header(props) {
  const { handleMuteSounds } = props;
  const pageTransition = {
    inModule: {
      opacity: 0,
    },
    animModule: {
      opacity: 1,
    },

    outModule: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      variants={pageTransition}
      initial={"inModule"}
      animate={"animModule"}
      exit={"outModule"}
    >
      <HeaderStyle>
        <button onClick={handleMuteSounds}>mute</button>
      </HeaderStyle>
    </motion.div>
  );
}

export default Header;
