import React from "react";
import { motion } from "framer-motion";
import { HeaderStyle } from "../Layout";

function Header(props) {
  return (
    <HeaderStyle>
      <motion.div
        initial={{
          opacity: 0,
          x: "-100vh"
        }}
        animate={{
          opacity: 1,
          x: 0
        }}
      />
    </HeaderStyle>
  );
}

export default Header;
