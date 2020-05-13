import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { pageVariants } from "../PageVariants";
import { pageTransition } from "../PageTransition";
import { motion } from "framer-motion";
import BackButton from "../BackButton";
import { setUser } from "../../actions";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { CircularProgress } from "@material-ui/core";

import { useHistory } from "react-router-dom";

const loadingStyle = {
  position: "absolute",
  left: "calc(50% - 28px)",
  top: "50%",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "50px",
    borderRadius: "50px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const classes = useStyles();
  const { setUser, user } = props;

  const [loading, setLoading] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  let history = useHistory();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        history.push("/customCategories");
      }, 200);
    }
  }, [user, history]);

  const handleGoBack = () => {
    setTimeout(() => {
      history.push("/");
    }, 200);
  };

  useEffect(() => {
    if (success === "Account created") {
      setTimeout(() => {
        history.push("/login");
      }, 800);
    }
  }, [success, history]);

  const handleRegister = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("https://headsupbackend.herokuapp.com/register", {
        email: email,
        password: password,
        passwordRepeat: passwordRepeat,
      })
      .then((user) => {
        console.log(user);
        if (user.data.error) {
          setError(user.data.error[0]);
          setSuccess("");
          setLoading(false);
        } else {
          setError("");
          setLoading(false);
          setUser({
            email: user.data.email,
            password: user.data.password,
          });
          setSuccess("Account created");
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <motion.div
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      className={"register"}
    >
      <BackButton handleGoBack={handleGoBack} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Repeat password"
                  type="password"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                />
              </Grid>
            </Grid>
            {error !== "" ? (
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            ) : (
              ""
            )}
            {success !== "" ? (
              <Alert variant="filled" severity="success">
                {success}
              </Alert>
            ) : (
              ""
            )}
            {loading ? <CircularProgress style={loadingStyle} /> : ""}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleRegister}
              disabled={loading}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </motion.div>
  );
};

export default connect(null, { setUser })(Register);
