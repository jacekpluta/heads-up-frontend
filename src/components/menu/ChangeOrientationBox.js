import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ParStyle } from "../../Layout";

export default function ChangeOrientationBox(props) {
  return (
    <AnimatePresence>
      <motion.div
        className="ChangeOrientationBox"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 100 }}
        transition={{ delay: 0.05 }}
        exit={{ opacity: 0 }}
      >
        <ParStyle style={{ marginTop: "44vh" }}>
          Please rotate your device
        </ParStyle>
      </motion.div>
    </AnimatePresence>
  );
}
