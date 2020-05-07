import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoriesList from "./CategoriesList";

import BackButton from "../BackButton";
import { motion } from "framer-motion";

import Alert from "@material-ui/lab/Alert";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import RefreshIcon from "@material-ui/icons/Refresh";

import { pageVariantsLogin } from "../PageVariants";
import { pageTransition } from "../PageTransition";
import { setUser } from "../../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { GameCategoryContext } from "../../contex/GameCategoryContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(9),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "5px",
  },
}));

const CustomCategories = (props) => {
  const [myCategories, setMyCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [gameCategoryPicked, setGameCategoryPicked] = useState(false);

  const { setGameCategory } = useContext(GameCategoryContext);

  const classes = useStyles();

  let history = useHistory();

  useEffect(() => {
    if (gameCategoryPicked) {
      history.push("/gamemenu");
    }
  }, [gameCategoryPicked, history]);

  const handleGoBack = () => {
    setTimeout(() => {
      history.push("/");
    }, 200);
  };

  const handleInputSearchChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "searchTerm") {
      setSearchTerm(value);
    }
  };
  console.log(searchTerm);
  const loadCategories = () => {
    axios
      .get(`http://localhost:9000/api/category/get/`)
      .then((category) => {
        setMyCategories(category.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/category/get/`)
      .then((category) => {
        setMyCategories(category.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePlayCategory = (category) => {
    if (category.questions.length > 9) {
      setGameCategory(category);
      setGameCategoryPicked(true);
    } else {
      setError("You have to add atleast 10 questions before starting the game");
    }
  };

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

      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
          <motion.div onClick={loadCategories}>
            All categories
            <RefreshIcon
              style={{ position: "absolute", right: 0, marginRight: "10px" }}
            />
          </motion.div>
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          id="searchTerm"
          name="searchTerm"
          label="Search..."
          type="text"
          value={searchTerm}
          onChange={handleInputSearchChange}
        />

        <CategoriesList
          myCategories={myCategories}
          handlePlayCategory={handlePlayCategory}
          showAllCategories={showAllCategories}
        ></CategoriesList>
      </div>
      {error !== "" ? <Alert severity="error"> {error} </Alert> : ""}
      {success !== "" ? <Alert severity="success"> {success} </Alert> : ""}
    </motion.div>
  );
};

export default connect(null, { setUser })(CustomCategories);
