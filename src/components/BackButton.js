import React from "react";
import { motion } from "framer-motion";
import Icon from "@mdi/react";
import { mdiArrowLeftCircle } from "@mdi/js";

function BackButton(props) {
  return (
    <motion.div
      //  onMouseOver={() => props.handleClickOnSkipOff()}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8, transition: { duration: 1 } }}
      onClick={() => props.handleGoBack()}
      className="BackButtonContainer"
    >
      <Icon color="white" path={mdiArrowLeftCircle} />
    </motion.div>
  );
}
export default BackButton;
