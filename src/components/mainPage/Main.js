import React from "react";
import Box from "./Box";
import { Grid } from "@material-ui/core/";

const Main = (props) => {
  const { gameCategoriesList, muteSounds } = props;

  return (
    <div className="Main">
      <Grid container spacing={0}>
        {gameCategoriesList.map((gameCategory) => (
          <Grid
            item
            xs={6}
            style={{ paddingBottom: "5%" }}
            key={gameCategory.name}
          >
            <Box
              backgroundImage={gameCategory.background}
              muteSounds={muteSounds}
              gameCategory={gameCategory}
            ></Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Main;