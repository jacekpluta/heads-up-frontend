import React from "react";
import { ParStyle } from "../styles/Layout";

const divStyle = {
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "10px",

  position: "fixed",
  width: "100%",
  height: "100vh",
  left: "0%",
  top: " 0%",
};

export default function InvalidDevice() {
  return (
    <div className="App" style={divStyle}>
      <ParStyle style={{ fontSize: "6vw" }}>
        SORRY, THIS GAME IS ONLY AVAILABLE ON MOBILE DEVICES
      </ParStyle>
    </div>
  );
}
