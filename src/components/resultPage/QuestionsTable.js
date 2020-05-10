import React from "react";
import { Table } from "semantic-ui-react";
import { motion } from "framer-motion";

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  width: "70%",
  maxHeight: "100px",
  color: "#f8f8ff",
};

const questionsTransitionContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.8,
    },
  },
};

const questionsTransition = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const pStyle = {
  textAlign: "center",
  width: "100%",
  fontSize: "3.5vh",
  color: "#f8f8ff",
};

const wrongColorCell = {
  background:
    "-webkit-linear-gradient(left, #074285 0% ,#ff0707 50%,  #074285 100%)",
  marginTop: "1px",
  marginBottom: "1px",
  marginLeft: "10px",
};

const correctColorCell = {
  background:
    "-webkit-linear-gradient(left, #074285 0% ,#07ff30 50%,  #074285 100%)",
  marginTop: "1px",
  marginBottom: "1px",
  marginLeft: "10px",
};
export default function QuestionsTable(props) {
  const { questionsResult, points } = props;

  return (
    <motion.div
      className="result-questions-container-questions-table"
      variants={questionsTransitionContainer}
      initial="hidden"
      animate="visible"
    >
      <Table inverted style={tableStyle}>
        <Table.Body>
          {questionsResult
            ? questionsResult.map((question, key) => (
                <motion.tr
                  points={key}
                  key={key}
                  variants={questionsTransition}
                  style={
                    points[key] === "0" ? wrongColorCell : correctColorCell
                  }
                >
                  <td style={pStyle}>{question}</td>
                </motion.tr>
              ))
            : ""}
        </Table.Body>
      </Table>
    </motion.div>
  );
}
