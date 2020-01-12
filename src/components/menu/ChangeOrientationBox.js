import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParStyle } from "../../styles/Layout";

export default function ChangeOrientationBox(props) {
  return (
    <AnimatePresence>
      <motion.div
        className="ChangeOrientationBox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        exit={{ opacity: 0 }}
      >
        <ParStyle style={{ marginTop: "44vh", fontSize: "7vw" }}>
          Please rotate your device
        </ParStyle>
      </motion.div>
    </AnimatePresence>
  );
}
