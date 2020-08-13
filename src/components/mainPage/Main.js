import React from "react";
import Box from "./Box";

const Main = (props) => {
  const { gameCategoriesList } = props;

  return (
    <div className="main">
      {gameCategoriesList.map((gameCategory) => (
        <div className="mainItem">
          <Box
            backgroundImage={gameCategory.background}
            gameCategory={gameCategory}
          ></Box>
        </div>
      ))}
    </div>
  );
};

export default Main;
