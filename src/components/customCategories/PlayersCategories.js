import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoriesList from "./CategoriesList";

import BackButton from "../BackButton";
import { motion } from "framer-motion";

import Alert from "@material-ui/lab/Alert";
import { backendUrl } from "../../backendUrl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import { CircularProgress } from "@material-ui/core/";

import { pageVariantsLogin } from "../PageVariants";
import { pageTransition } from "../PageTransition";
import { setUser } from "../../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { GameCategoryContext } from "../../contex/GameCategoryContext";

import { clickSound } from "../Sounds";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
}));

const CustomCategories = (props) => {
  const [allCategories, setAllCategories] = useState([]);
  const [showAllCategories] = useState(true);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [gameCategoryPicked, setGameCategoryPicked] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);

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
    if (event.target.value) {
      setSearchTerm(event.target.value);
    } else {
      setSearchTerm("");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const allPublicCategories = [...allCategories];

      const regex = new RegExp(searchTerm, "gi");
      const results = allPublicCategories.reduce((acc, category) => {
        if (
          (category.name && category.name.match(regex)) ||
          (category.email && category.email.match(regex))
        ) {
          acc.push(category);
        }
        return acc;
      }, []);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, allCategories]);

  const loadCategories = () => {
    setRefreshLoading(true);

    setTimeout(() => {
      setRefreshLoading(false);
    }, 2000);

    clickSound.play();

    axios
      .get(`${backendUrl}/api/category/get/`)
      .then((category) => {
        setAllCategories(category.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${backendUrl}/api/category/get/`)
      .then((category) => {
        setAllCategories(category.data.categories);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePlayCategory = (category) => {
    clickSound.play();

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
      className="customcategories"
    >
      <BackButton handleGoBack={handleGoBack} blackColor={true} />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
          <motion.div
            onClick={loadCategories}
            style={{ paddingTop: "50px", paddingBottom: "10px" }}
          >
            <div style={{ textAlign: "center" }}>PLAYERS CATEGORIES</div>
            {refreshLoading ? (
              <CircularProgress
                style={{ position: "absolute", right: 0, marginTop: "-50px" }}
              />
            ) : (
              <RefreshIcon
                style={{
                  position: "absolute",
                  right: 0,
                  marginTop: "-50px",
                  fontSize: "50px",
                }}
              />
            )}
          </motion.div>
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          id="searchTerm"
          name="searchTerm"
          label="Search name or a user"
          type="text"
          value={searchTerm}
          onChange={handleInputSearchChange}
        />

        <CategoriesList
          searchResults={searchResults}
          myCategories={allCategories}
          handlePlayCategory={handlePlayCategory}
          showAllCategories={showAllCategories}
          loading={loading}
        ></CategoriesList>

        {error !== "" ? (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        ) : (
          ""
        )}
      </div>
    </motion.div>
  );
};

export default connect(null, { setUser })(CustomCategories);
