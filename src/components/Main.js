import React, { useState, useEffect } from "react";
import Box from "./Box";

const Main = props => {
  const numbers = [1, 2, 3, 4];
  const [handleBoxIdCompleted, setHandleBoxIdCompleted] = useState(false);

  const [gameVariant, setCurrentGameVariant] = useState({
    name: props.gameVariantsList[0].name,
    questions: props.gameVariantsList[0].questions,
    background: props.gameVariantsList[0].background,
    gameTile: props.gameVariantsList[0].gameTile,
    gameMenuTitle: props.gameVariantsList[0].gameMenuTitle
  });

  const [boxId, setboxId] = useState(0);

  const handleBoxId = boxIdProps => {
    setboxId(boxIdProps);
    setHandleBoxIdCompleted(true);
  };

  useEffect(() => {
    setCurrentGameVariant({
      name: props.gameVariantsList[boxId].name,
      questions: props.gameVariantsList[boxId].questions,
      background: props.gameVariantsList[boxId].background,
      gameTile: props.gameVariantsList[boxId].gameTile,
      gameMenuTitle: props.gameVariantsList[boxId].gameMenuTitle
    });
  }, [boxId, props.gameVariantsList]);

  // const addGameVariant = variant => {
  //   setGameVariantsList([...gameVariant, variant]);
  // };

  return (
    <div className="Main">
      {numbers.map((key, id) => {
        return (
          <Box
            gameVariant={gameVariant}
            key={key}
            id={id}
            backgroundBox={props.gameVariantsList[key].background}
            handleBoxId={handleBoxId}
            handleBoxIdCompleted={handleBoxIdCompleted}
          ></Box>
        );
      })}
    </div>
  );
};

export default Main;
