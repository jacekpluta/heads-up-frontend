import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const pStyle = {
  textAlign: "center",
  width: "100%",
  marginTop: "0%",
  marginBottom: "3%",
  fontSize: "120px",
  color: "#fff",
  textShadow:
    "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #00DEFF, 0 0 70px #00DEFF, 0 0 80px #00DEFF, 0 0 100px #00DEFF, 0 0 150px #00DEFF"
};

export default function ChangeOrientationBox(props) {
  return (
    <AnimatePresence>
      <motion.div
        className="GameMenu"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 100 }}
        transition={{ delay: 0.05 }}
        exit={{ opacity: 0 }}
      >
        <p style={pStyle}>Rotate your device</p>
      </motion.div>
    </AnimatePresence>
  );
}
