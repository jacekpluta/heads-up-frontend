import React from "react";

import DescribeTile from "./menu/DescribeTile";
import ShowTile from "./menu/ShowTile";
import ChallangeTile from "./menu/ChallangeTile";
import DrawTile from "./menu/DrawTile";

const variantsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  flexFlow: "row wrap"
};
export default function GameMenu(props) {
  return (
    <div style={variantsStyle}>
      <DescribeTile />
      <ShowTile />
      <ChallangeTile />
      <DrawTile />
    </div>
  );
}
