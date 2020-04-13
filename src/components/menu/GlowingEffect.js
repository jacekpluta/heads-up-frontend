import React from "react";
import { Grid } from "@material-ui/core/";

export default function GlowingEffect() {
  return (
    <Grid container justify="center">
      <Grid item xs={4}>
        <div className="glow">
          <span></span>
          <span></span>
        </div>
      </Grid>
    </Grid>
  );
}
