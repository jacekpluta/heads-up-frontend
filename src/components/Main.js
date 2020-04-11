import React from "react";
import Box from "./Box";
import { Grid } from "@material-ui/core/";
import { motion } from "framer-motion";

const Main = (props) => {
  const { gameVariantsList, muteSounds } = props;

  return (
    <motion.div className="Main">
      <Grid container spacing={0}>
        {gameVariantsList.map((gameVariant) => (
          <Grid
            item
            xs={6}
            style={{ paddingBottom: "5%" }}
            key={gameVariant.name}
          >
            <Box
              backgroundImage={gameVariant.background}
              muteSounds={muteSounds}
              gameVariant={gameVariant}
            ></Box>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default Main;
