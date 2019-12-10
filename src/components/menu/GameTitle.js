import React from "react";

function GameTitle(props) {
  const tileStyle = {
    marginBottom: "40px",
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: "10px",
    borderWidth: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "10%",
    marginTop: "2%",
    width: "65%",
    backgroundSize: "100% 100%",
    backgroundImage: `url(${props.gameVariant.gameTile})`,
    position: "relative"
  };

  return <div style={tileStyle}></div>;
}

export default GameTitle;
