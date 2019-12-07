import React from "react";

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
        handleGameVariantDescribe={props.handleGameVariantDescribe}
      />
      <ShowTile handleGameVariantShow={props.handleGameVariantShow} />
      <ChallangeTile handleGameChallange={props.handleGameChallange} />
      <DrawTile handleGameDraw={props.handleGameDraw} />
    </div>
  );
}