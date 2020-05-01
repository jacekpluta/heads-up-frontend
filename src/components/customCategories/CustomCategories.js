import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import BackButton from "../BackButton";
import { motion } from "framer-motion";
import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { useCookies } from "react-cookie";

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

  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cookies, setCookies] = useCookies(["name"]);

  let history = useHistory();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        history.push("/login");
      }, 200);
    }
  }, [user, history]);

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
        setCookies("user", null, { path: "/" });
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:9000/customcategories", {
        //   userEmail: user.email,
      })
      .then((category) => {
        console.log(category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddCategory = () => {
    axios
      .post("http://localhost:9000/customcategories", {
        id: uuidv4(),
        userEmail: user.email,
        name: categoryName,
      })
      .then((category) => {
        if (category.data.error) {
          setError(category.data.error[0]);
          setSuccess("");
        } else {
          setError("");
          setSuccess("Category added");
        }
      })
      .catch((err) => {
        console.log(err);
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

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="categoryName"
              label="Category Name"
              name="categoryName"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleAddCategory}
        >
          Add category
        </Button>

        {error !== "" ? <Alert severity="error"> {error} </Alert> : ""}
        {success !== "" ? <Alert severity="success"> {success} </Alert> : ""}
      </Container>
    </motion.div>
  );
};

export default connect(null, { setUser })(CustomCategories);
