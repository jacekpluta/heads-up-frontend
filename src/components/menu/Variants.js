import React from "react";

import DescribeTile from "./DescribeTile";
import ShowTile from "./ShowTile";
import ChallangeTile from "./ChallangeTile";
import DrawTile from "./DrawTile";

export default function GameMenu(props) {
  return (
    <div className="VariantsStyle">
      <DescribeTile
        handleGameVariantDescribe={props.handleGameVariantDescribe}
      />
      <ShowTile handleGameVariantShow={props.handleGameVariantShow} />
      <ChallangeTile handleGameChallange={props.handleGameChallange} />
      <DrawTile handleGameDraw={props.handleGameDraw} />
    </div>
  );
}
