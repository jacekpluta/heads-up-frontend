import React from "react";

function GameTitle(props) {
  const gameTitle = {
    marginBottom: "40px",
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: "10px",
    borderWidth: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "7%",
    marginTop: "2%",
    width: "17%",
    hegiht: "50vh",
    backgroundSize: "100% 100%",
    backgroundImage: `url(${props.gameVariant.gameTile})`
  };

  return <div style={gameTitle}></div>;
}

export default GameTitle;
