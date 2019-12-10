import React from "react";

function GameTitle(props) {
  const tileStyle = {
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
    backgroundSize: "100% 100%",
    backgroundImage: `url(${props.gameVariant.gameTile})`,
    position: "relative",
    opacity: 1,
    transition: 0.3
  };

  return <div style={tileStyle}></div>;
}

export default GameTitle;
