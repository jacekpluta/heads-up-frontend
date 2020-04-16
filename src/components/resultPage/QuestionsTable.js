import React from "react";
import { Table } from "semantic-ui-react";
import { motion } from "framer-motion";

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  width: "70%",

  color: "#f8f8ff",

  // textShadow: "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15)",
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

  // textShadow: "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15)",
};
export default function QuestionsTable(props) {
  const { questionsResult, points } = props;

  return (
    <motion.div
      className="result-questions-container-questions-table "
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
                    points[key] === "-1"
                      ? {
                          background:
                            "-webkit-linear-gradient(left, #074285 0% ,#ff0707 50%,  #074285 100%)",
                          marginTop: "1px",
                          marginBottom: "1px",
                          marginLeft: "10px",
                        }
                      : {
                          background:
                            "-webkit-linear-gradient(left, #074285 0% ,#07ff30 50%,  #074285 100%)",
                          marginTop: "1px",
                          marginBottom: "1px",
                          marginLeft: "10px",
                        }
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
