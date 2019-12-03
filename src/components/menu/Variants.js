import React, { useState, useEffect } from "react";

import DescribeTile from "./DescribeTile";
import ShowTile from "./ShowTile";
import ChallangeTile from "./ChallangeTile";
import DrawTile from "./DrawTile";

const variantsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  flexFlow: "row wrap"
};
export default function GameMenu(props) {
  return (
    <div style={variantsStyle}>
      <DescribeTile
        onClick={props.onClick}
        gameVariantChosen={props.gameVariantChosen}
      />
      <ShowTile
        onClick={props.onClick}
        gameVariantChosen={props.gameVariantChosen}
      />
      <ChallangeTile
        onClick={props.onClick}
        gameVariantChosen={props.gameVariantChosen}
      />
      <DrawTile
        onClick={props.onClick}
        gameVariantChosen={props.gameVariantChosen}
      />
    </div>
  );
}
