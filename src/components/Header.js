import React from "react";
import { motion } from "framer-motion";
import HeaderPic from "../components/pic/headerPic.jpg";

const headerStyle = {
  height: "20vh",
  marginTop: "-1%",
  padding: "5%",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  objectFit: "cover",
  borderBottom: "solid",
  borderWidth: "2vh",
  borderColor: "white",
  backgroundSize: "100% 100%",
  backgroundImage: `url(${HeaderPic})`
};

function Header(props) {
  return (
    <motion.div
      style={headerStyle}
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
