import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoriesList from "./CategoriesList";
import { backendUrl } from "../../backendUrl";
import BackButton from "../BackButton";
import { motion } from "framer-motion";
import Button from "@material-ui/core/Button";

import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

import Alert from "@material-ui/lab/Alert";
import { useCookies } from "react-cookie";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { pageVariantsLogin } from "../PageVariants";
import { pageTransition } from "../PageTransition";
import { setUser } from "../../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { GameCategoryContext } from "../../contex/GameCategoryContext";

import { clickSound } from "../Sounds";
const buttonSignoutStyle = {
  float: "right",
  backgroundColor: "#1b85ff",
  borderColor: " #1b63ff",
  borderStyle: "ridge",
  borderRadius: "15px",
  borderWidth: "4px",
  color: "white",
  marginTop: "12px",
  marginRight: "20px",
};

const addCategoryButtonStyle = {
  position: "absolute",
  left: 0,
  marginLeft: "5px",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "5px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CustomCategories = (props) => {
  const { setUser, user, onPickedCategory, showAllCategories } = props;

  const [myCategories, setMyCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [_, setCookies] = useCookies(["name"]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const [modalEditOpen, setEditModalOpen] = useState(false);
  const [modalAddOpen, setAddModalOpen] = useState(false);

  const [gameCategoryPicked, setGameCategoryPicked] = useState(false);

  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState(getSize);

  const { setGameCategory } = useContext(GameCategoryContext);

  let history = useHistory();

  useEffect(() => {
    if (gameCategoryPicked) {
      history.push("/gamemenu");
    }
  }, [gameCategoryPicked, history]);

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        history.push("/login");
      }, 200);
    }
  }, [user, history]);

  const handleGoBack = () => {
    clickSound.play();

    setTimeout(() => {
      history.push("/");
    }, 200);
  };

  const handleLogout = () => {
    clickSound.play();

    axios.get(`${backendUrl}/logout`).then((data) => {
      if (data.status === 200 && data.data.message === "Logged out") {
        setTimeout(() => {
          history.push("/login");
        }, 200);

        setUser(null);
        setCookies("user", null, { path: "/" });
      }
    });
  };

  const loadCategories = () => {
    clickSound.play();

    axios
      .get(`${backendUrl}/api/category/get/${user.email}`)
      .then((category) => {
        setMyCategories(category.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (user) {
      axios
        .get(`${backendUrl}/api/category/get/${user.email}`)
        .then((category) => {
          setMyCategories(category.data.categories);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const handleEditModalOpen = (category) => {
    clickSound.play();

    setCurrentCategory(category);
    setEditModalOpen(true);
  };

  const handleEditCategory = () => {
    const categoryId = currentCategory._id;

    axios
      .put(`${backendUrl}/api/category/update/${categoryId}`, {
        email: user.email,
        name: currentCategory.name,
        description: currentCategory.description,
        questions: currentCategory.questions,
      })
      .then((category) => {
        if (category.data.error) {
          setError(category.data.error[0]);
          setSuccess("");
        } else {
          setMyCategories((myCategories) => [...myCategories, category]);
          setError("");
          setSuccess("Category updated");
        }
      })
      .then(() => {
        setCurrentCategory(null);
        loadCategories();
        setEditModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    clickSound.play();

    axios
      .delete(`${backendUrl}/api/category/remove/${categoryId}`)
      .then((category) => {
        if (category.data.error) {
          setError(category.data.error[0]);
          setSuccess("");
        } else {
          const newCategories = myCategories.filter((category) => {
            if (category._id !== categoryId) return category;
          });
          setMyCategories(newCategories);
          setError("");
          setSuccess("Category deleted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputAddCategoryChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "categoryName") {
      setCategoryName(value);
    }
    if (name === "categoryDescription") {
      setCategoryDescription(value);
    }
  };

  const handleInputCurrentCategoryChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "categoryName") {
      setCurrentCategory((prevState) => ({
        ...prevState,
        name: value,
      }));
    }
    if (name === "categoryDescription") {
      setCurrentCategory((prevState) => ({
        ...prevState,
        description: value,
      }));
    }
  };

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const handleAddCategory = (event) => {
    event.preventDefault();

    axios
      .post(`${backendUrl}/api/category/create`, {
        email: user.email,
        name: categoryName,
        description: categoryDescription,
        questions: [],
      })
      .then((category) => {
        if (category.data.error) {
          setError(category.data.error[0]);
          setSuccess("");
        } else {
          setMyCategories((myCategories) => [...myCategories, category]);
          setError("");
          setSuccess("Category added");
        }
      })
      .then(() => {
        setCategoryName("");
        setCategoryDescription("");
        loadCategories();
        setAddModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    clickSound.play();
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    clickSound.play();
  };

  const handleOpenCategory = (category) => {
    clickSound.play();

    setTimeout(() => {
      history.push("/category");
    }, 200);
    onPickedCategory(category);
  };

  const handlePlayCategory = (category) => {
    clickSound.play();

    if (category.questions.length > 9) {
      setGameCategory(category);
      setGameCategoryPicked(true);
    } else {
      setError("Category needs atleast 10 questions before starting the game");
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
      <Button
        type="submit"
        size="small"
        style={buttonSignoutStyle}
        color="primary"
        onClick={handleLogout}
      >
        SIGN OUT
      </Button>
      <div className={classes.paper}>
        <Button
          style={addCategoryButtonStyle}
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            clickSound.play();
            setAddModalOpen(true);
          }}
        >
          {windowSize.width >= 500 ? "Add Category" : "Add"}
        </Button>
        <Typography component="h1" variant="h6">
          Your categories
        </Typography>

        <CategoriesList
          loading={loading}
          myCategories={myCategories}
          handleEditModalOpen={handleEditModalOpen}
          handleDeleteCategory={handleDeleteCategory}
          handleOpenCategory={handleOpenCategory}
          handlePlayCategory={handlePlayCategory}
          showAllCategories={showAllCategories}
          windowSize={windowSize}
        ></CategoriesList>
        <EditCategoryModal
          handleEditCategory={handleEditCategory}
          categoryName={categoryName}
          categoryDescription={categoryDescription}
          classes={classes}
          modalEditOpen={modalEditOpen}
          handleCloseEditModal={handleCloseEditModal}
          currentCategory={currentCategory}
          handleInputCurrentCategoryChange={handleInputCurrentCategoryChange}
        ></EditCategoryModal>
        <AddCategoryModal
          handleInputAddCategoryChange={handleInputAddCategoryChange}
          handleAddCategory={handleAddCategory}
          categoryName={categoryName}
          categoryDescription={categoryDescription}
          classes={classes}
          modalAddOpen={modalAddOpen}
          handleCloseAddModal={handleCloseAddModal}
        ></AddCategoryModal>

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
      </div>
    </motion.div>
  );
};

export default connect(null, { setUser })(CustomCategories);
