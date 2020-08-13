import React from "react";
import { Grid } from "@material-ui/core/";

import DescribeTile from "./tiles/DescribeTile";
import ShowTile from "./tiles/ShowTile";
import ChallangeTile from "./tiles/ChallangeTile";
import DrawTile from "./tiles/DrawTile";
import { useHistory } from "react-router-dom";

//SOUDS
import { clickSound } from "../Sounds";

export default function GameMenu() {
  let history = useHistory();

  const handleStartGame = () => {
    clickSound.play();
    history.push("/gamemodule");
  };

  return (
    <Grid container style={{ paddingTop: "40px" }}>
      <Grid
        container
        item
        xs={6}
        justify="center"
        style={{ paddingBottom: "2%" }}
      >
        <DescribeTile handleStartGame={handleStartGame} />
      </Grid>
      <Grid
        container
        item
        xs={6}
        justify="center"
        style={{ paddingBottom: "2%" }}
      >
        <ShowTile handleStartGame={handleStartGame} />
      </Grid>
      <Grid container item xs={6} justify="center">
        <DrawTile handleStartGame={handleStartGame} />
      </Grid>
      <Grid container item xs={6} justify="center">
        <ChallangeTile handleStartGame={handleStartGame} />
      </Grid>
    </Grid>
  );
}
