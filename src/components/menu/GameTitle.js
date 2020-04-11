import React from "react";
import { Grid } from "@material-ui/core/";
function GameTitle(props) {
  const gameTitleStyle = {
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: "10px",
    borderWidth: "5px",
    minWidth: "60%",
    backgroundSize: "100% 100%",
    backgroundImage: `${props.gameCategoryImage.backgroundImage}`,
    marginTop: "15%",
  };

  return (
    <Grid container justify="center">
      <Grid item xs={4} style={gameTitleStyle}>
        <div className="loader">
          <span></span>
          <span></span>
        </div>
      </Grid>
    </Grid>
  );
}

export default GameTitle;
