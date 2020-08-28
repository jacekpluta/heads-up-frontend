import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faCaretSquareLeft } from "@fortawesome/free-solid-svg-icons";
import QuestionsTable from "./QuestionsTable";
import Medal from "./Medal";
import { Grid } from "@material-ui/core/";

import { pageVariants } from "../PageVariants";
import { pageTransition } from "../PageTransition";
import { clickSound } from "../Sounds";

const pStyle = {
  textAlign: "center",
  width: "100%",
  fontSize: "5vh",
  color: "#f8f8ff",
  paddingTop: "30px",
  fontWeight: 700,
  textShadow: "6px 6px 0px rgba(0,0,0,0.2)",
};

const iconContainerStyle = {
  borderStyle: "ridge",
  borderWidth: "10px",
  borderRadius: "30%",
  borderColor: " #1b85ff",
  background: " #1b85ff",
  paddingTop: "15px",
  paddingBottom: "15px",
  marginTop: "20px",
  marginBottom: "50px",
  width: "40%",
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
        if (point === "1") {
          allPoints = allPoints + parseInt(point);
        }
      });
    }
    return allPoints;
  };

  useEffect(() => {
    const page = document.documentElement;
    if (page.requestFullscreen) {
      page.requestFullscreen();
    } else if (page.mozRequestFullScreen) {
      page.mozRequestFullScreen();
    } else if (page.webkitRequestFullscreen) {
      page.webkitRequestFullscreen();
    } else if (page.msRequestFullscreen) {
      page.msRequestFullscreen();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.screen.orientation.lock("portrait");
    }, 1000);
  }, []);

  useEffect(() => {
    if (refreshGame) {
      clickSound.play();
      history.push("/gameModule");
    }
  }, [refreshGame, history]);

  const handleGoBack = () => {
    setTimeout(() => {
      history.push("/gamemenu");
    }, 200);
  };

  useEffect(() => {
    if (!points && !questionsResult) {
      history.push("/");
    }
  }, [points, questionsResult, history]);

  return (
    <motion.div
      className="result"
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
    >
      <p style={pStyle}>YOUR SCORE </p>
      <Medal countPoints={countPoints}> </Medal>

      <div className="result__questions">
        <QuestionsTable questionsResult={questionsResult} points={points} />

        <Grid container>
          <Grid container item xs={6} justify="center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.95,
              }}
              style={iconContainerStyle}
              onClick={handleGoBack}
            >
              <FontAwesomeIcon
                icon={faCaretSquareLeft}
                size="4x"
                color="white"
                className="icon"
              />
            </motion.div>
          </Grid>

          <Grid
            container
            item
            xs={6}
            justify="center"
            onClick={() => {
              setRefreshGame(true);
            }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.95,
              }}
              style={iconContainerStyle}
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
