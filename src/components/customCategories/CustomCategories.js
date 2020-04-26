import React, { useState, useEffect } from "react";
import axios from "axios";

import BackButton from "../BackButton";
import { motion } from "framer-motion";
import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { pageVariantsLogin } from "../PageVariants";
import { pageTransition } from "../PageTransition";
import { setUser } from "../../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const buttonStyle = {
  float: "right",
  backgroundColor: "#1b85ff",
  borderColor: " #1b63ff",
  borderStyle: "ridge",
  borderRadius: "15px",
  borderWidth: "4px",
  color: "white",
  marginTop: "25px",
  marginRight: "25px",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "50px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const CustomCategories = (props) => {
  const { setUser, user } = props;

  let history = useHistory();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        history.push("/login");
      }, 200);
    }
  }, [user]);

  const handleGoBack = () => {
    setTimeout(() => {
      history.push("/");
    }, 200);
  };

  const handleLogout = () => {
    axios.get("http://localhost:9000/logout").then((data) => {
      if (data.status === 200 && data.data.message === "Logged out") {
        setTimeout(() => {
          history.push("/login");
        }, 200);
        setUser(null);
      }
    });
  };

  const classes = useStyles();

  return (
    <motion.div
      variants={pageVariantsLogin}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      className={"Login"}
    >
      <BackButton handleGoBack={handleGoBack} />
      <Button
        type="submit"
        variant="contained"
        size="small"
        style={buttonStyle}
        color="primary"
        onClick={handleLogout}
      >
        Sign Out
      </Button>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>{<LockOutlinedIcon />}</Avatar> */}
          <Typography component="h1" variant="h5">
            Custom categories
          </Typography>
        </div>
      </Container>
    </motion.div>
  );
};

export default connect(null, { setUser })(CustomCategories);
