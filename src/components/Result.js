import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Refresh.scss";
import { Table } from "semantic-ui-react";

function Result(props) {
  const pStyle = {
    textAlign: "center",
    width: "100%",
    fontSize: "30px",
    color: "#f8f8ff",
    textShadow: "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15)"
  };

  const tableStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    fontSize: "20px",
    color: "#f8f8ff",
    textShadow: "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15)"
  };

  return (
    <AnimatePresence>
      {props.showResult === true && (
        <motion.div
          style={{
            opacity: 0,
            display: "block"
          }}
          className="Result"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          exit={{ opacity: 0 }}
          onClick={() => props.handleGameRefresh()}
        >
          <p style={pStyle}>Points: {props.points}</p>

          <Table inverted style={tableStyle}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Lp.</Table.HeaderCell>
                <Table.HeaderCell>Pytanie</Table.HeaderCell>
                <Table.HeaderCell>Punkty</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {props.questionsResult.map((question, key) => (
                <Table.Row key={key}>
                  <Table.Cell>{key + 1}</Table.Cell>
                  <Table.Cell>{question}</Table.Cell>
                  <Table.Cell>{props.pointsObject[key]}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <h1>
            <div className="reloadSingle"></div>
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Result;
