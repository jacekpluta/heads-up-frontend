import React from "react";
import { motion } from "framer-motion";
import { HeaderStyle } from "../styles/Layout";

function Header(props) {
  const { handleMuteSounds } = props;

  return (
    <HeaderStyle>
      <button onClick={handleMuteSounds}>mute</button>
    </HeaderStyle>
  );
}

export default Header;
