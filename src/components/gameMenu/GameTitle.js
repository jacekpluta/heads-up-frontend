import React from "react";
import { Grid } from "@material-ui/core/";
import defaultPic from "../../pic/defaultPic.png";

function GameTitle(props) {
  const { gameCategoryImage } = props;
  const defaulBackgroundImage = `url(${defaultPic})`;

  const gameTitleStyle = {
    maxWidth: "35vw",
    maxHeight: "25vh",
    minWidth: "35vw",
    minHeight: "25vh",

    borderStyle: "solid",
    borderColor: "white",
    borderRadius: "10px",
    borderWidth: "10px",

    backgroundSize: "100% 100%",
    backgroundImage: `${
      gameCategoryImage
        ? gameCategoryImage.backgroundImage
        : defaulBackgroundImage
    }`,
    marginTop: "50px",
    zIndex: 5,
  };

  return (
    <Grid container justify="center">
      <Grid item xs={4} style={gameTitleStyle}></Grid>
    </Grid>
  );
}

export default GameTitle;
