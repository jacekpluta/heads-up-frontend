import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BackButton from "../BackButton";
import { motion } from "framer-motion";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { pageVariantsLogin } from "../PageVariants";
import { pageTransition } from "../PageTransition";
import { setUser } from "../../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const loadingStyle = {
  position: "absolute",
  left: "calc(50% - 28px)",
  top: "50%",
};

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const { user, setUser } = props;

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

  const handleLogin = (event) => {
    setLoading(true);
    event.preventDefault();

    axios
      .post("https://headsupbackend.herokuapp.com/user", {
        email: email,
        password: password,
      })
      .then((data) => {
        if (
          data.status === 200 &&
          data.data.error &&
          data.data.error[0] === "Password or email address is incorrect"
        ) {
          setLoading(false);
          setUser(null);
          setError(data.data.error[0]);
        } else if (
          data.status === 200 &&
          data.data.message === "Password and email address are correct"
        ) {
          setLoading(false);
          setUser({
            email: email,
            password: password,
          });
          setError("");
        } else {
          setLoading(false);
          setUser(null);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: "50%",
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
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  return (
    <motion.div
      variants={pageVariantsLogin}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      className="login"
    >
      <BackButton handleGoBack={handleGoBack} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>{<LockOutlinedIcon />}</Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
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
            {error !== "" ? (
              <Alert variant="filled" severity="error">
                {error}
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
              onClick={handleLogin}
              disabled={loading}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
              <Grid item>
                <Link to="/register" variant="body2">
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

export default connect(null, { setUser })(Login);
