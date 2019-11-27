import React from "react";
import { motion } from "framer-motion";
import "../header.css";
function Header(props) {
  return (
    <motion.div
      className="Header"
      initial={{
        opacity: 0,
        x: "-100vh"
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
    />
  );
}

export default Header;
