import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Table } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faCaretSquareLeft } from "@fortawesome/free-solid-svg-icons";

import { Grid } from "@material-ui/core/";

import buttonClick from "../sounds/buttonClick.mp3";
import UIfx from "uifx";

const clickSound = new UIfx(buttonClick, {
  volume: 1,
  throttleMs: 100,
});

const pStyle = {
  textAlign: "center",
  width: "100%",
  fontSize: "30px",
  color: "#f8f8ff",
  textShadow: "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15)",
};

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%",
  fontSize: "20px",
  color: "#f8f8ff",
  textShadow: "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15)",
};

const pageTransition = {
  inModule: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
  outModule: {
    opacity: 0,
    x: -200,
    transition: {
      duration: 1,
    },
  },
};

const refreshIconStyle = {
  marginLeft: "50%",
};
const backIconStyle = {
  marginLeft: "50%",
};

function Result(props) {
  let history = useHistory();

  const { points, questionsResult } = props;

  const [refreshGame, setRefreshGame] = useState(false);
  const [transitionOff, setTransitionOff] = useState(false);

  const countPoints = () => {
    let allPoints = 0;
    points.map((point) => {
      if (point === 1) {
        allPoints = parseInt(point) + allPoints;
      }
    });
    if (allPoints === 0) {
      return allPoints + " punktów";
    } else if (allPoints < 5) {
      return allPoints + " punkty";
    } else {
      return allPoints + " punktów";
    }
  };

  useEffect(() => {
    if (refreshGame) {
      clickSound.play();
      history.push("/gameModule");
    }
  }, [refreshGame]);

  const handleGoBack = () => {
    clickSound.play();
    setTransitionOff(true);
    setTimeout(() => {
      history.push("/gamemenu");
    }, 200);
    setTransitionOff(true);
  };

  useEffect(() => {
    if (!points && !questionsResult) {
      history.push("/");
    }
  }, [points, questionsResult]);

  return (
    <motion.div
      className="Result"
      variants={pageTransition}
      initial={transitionOff ? "inModule" : "outModule"}
      animate={transitionOff ? "outModule" : "inModule"}
      exit={transitionOff ? "inModule" : "outModule"}
    >
      <p style={pStyle}>TWÓJ WYNIK: {points ? countPoints() : ""}</p>

      <Table inverted style={tableStyle}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Lp.</Table.HeaderCell>
            <Table.HeaderCell>Pytanie</Table.HeaderCell>
            <Table.HeaderCell>Punkty</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {questionsResult
            ? questionsResult.map((question, key) => (
                <Table.Row key={key} style={{ marginLeft: "10px" }}>
                  <Table.Cell>{key + 1}</Table.Cell>
                  <Table.Cell>{question}</Table.Cell>
                  <Table.Cell>{points[key]}</Table.Cell>
                </Table.Row>
              ))
            : ""}
        </Table.Body>
      </Table>
      <Grid container>
        <Grid container item xs={6} justify="center">
          <FontAwesomeIcon
            onClick={() => {
              setRefreshGame(true);
              setTransitionOff(true);
            }}
            icon={faRedo}
            size="3x"
            color="white"
            style={refreshIconStyle}
          />
        </Grid>
        <Grid container item xs={6} justify="center">
          <FontAwesomeIcon
            onClick={handleGoBack}
            icon={faCaretSquareLeft}
            size="3x"
            color="white"
            style={backIconStyle}
          />
        </Grid>
      </Grid>
    </motion.div>
  );
}

export default Result;
