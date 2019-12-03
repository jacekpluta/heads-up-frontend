import React from "react";
import GameImage from "../pic/gamePicOne.jpg";
const showTileStyle = {
  margin: "40px",
  border: "5px solid pink",
  borderStyle: "solid",
  borderColor: "white",
  borderRadius: "10px",
  borderWidth: "10px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "10%",
  marginTop: "2%",
  maxWidth: "500px",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundRepeat: "no - repeat",
  backgroundSize: "contain cover",
  backgroundSize: "100% 100%",
  backgroundImage: `url(${GameImage})`,
  position: "relative",
  opacity: 0.8,
  transition: 0.3
};

function GameTitle(props) {
  return <div style={showTileStyle} onClick={props.onClick}></div>;
}

export default GameTitle;
