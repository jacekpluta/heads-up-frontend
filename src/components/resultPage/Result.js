import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faCaretSquareLeft } from "@fortawesome/free-solid-svg-icons";
import QuestionsTable from "./QuestionsTable";
import Medal from "./Medal";
import { Grid } from "@material-ui/core/";

import buttonClick from "../../sounds/buttonClick.mp3";
import UIfx from "uifx";

const clickSound = new UIfx(buttonClick, {
  volume: 1,
  throttleMs: 100,
});

const pStyle = {
  textAlign: "center",
  width: "100%",
  fontSize: "5vh",
  color: "#f8f8ff",
  paddingTop: "15px",
  fontWeight: 700,
  textShadow: "6px 6px 0px rgba(0,0,0,0.2)",
};

const refreshIconContainerStyle = {
  borderStyle: "ridge",
  borderWidth: "10px",
  borderRadius: "30%",
  borderColor: " #1b85ff",

  background: " #1b85ff",
  paddingTop: "15px",
  paddingBottom: "15px",
  width: "65%",
  textAlign: "center",
};

const backIconContainerStyle = {
  borderStyle: "ridge",
  borderWidth: "10px",
  borderRadius: "30%",
  borderColor: " #1b85ff",

  background: " #1b85ff",
  paddingTop: "15px",
  paddingBottom: "15px",
  width: "60%",
  textAlign: "center",
};

function Result(props) {
  let history = useHistory();

  const { points, questionsResult } = props;

  const [refreshGame, setRefreshGame] = useState(false);

  const countPoints = () => {
    let allPoints = 0;
    if (points) {
      points.map((point) => {
        if (point === 1) {
          allPoints = parseInt(point) + allPoints;
        }
        return <div></div>;
      });
    }
    return allPoints;
  };

  useEffect(() => {
    if (refreshGame) {
      clickSound.play();
      history.push("/gameModule");
    }
  }, [refreshGame, history]);

  const handleGoBack = () => {
    clickSound.play();

    setTimeout(() => {
      history.push("/gamemenu");
    }, 200);
  };

  useEffect(() => {
    if (!points && !questionsResult) {
      history.push("/");
    }
  }, [points, questionsResult, history]);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: { opacity: 0, x: "100vw" },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 1,
  };

  return (
    <motion.div
      className="result-container"
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
    >
      <p style={pStyle}>TWÓJ WYNIK </p>
      <Medal countPoints={countPoints}> </Medal>

      <div className="result-questions-container">
        <QuestionsTable questionsResult={questionsResult} points={points} />

        <Grid container>
          <Grid
            container
            item
            xs={6}
            justify="center"
            className={"result-container-back-button"}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8,
              }}
              style={backIconContainerStyle}
              onClick={handleGoBack}
            >
              <FontAwesomeIcon
                icon={faCaretSquareLeft}
                size="4x"
                color="white"
              />
            </motion.div>
          </Grid>

          <Grid
            container
            item
            xs={6}
            justify="center"
            className={"result-container-refresh-button"}
            onClick={() => {
              setRefreshGame(true);
            }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8,
              }}
              style={refreshIconContainerStyle}
            >
              <FontAwesomeIcon icon={faRedo} size="4x" color="white" />
            </motion.div>
          </Grid>
        </Grid>
      </div>
    </motion.div>
  );
}

export default Result;
