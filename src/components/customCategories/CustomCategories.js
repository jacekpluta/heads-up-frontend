import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoriesList from "./CategoriesList";

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

const addCategoryButtonStyle = {
  position: "absolute",
  left: 0,
  marginLeft: "5px",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(9),
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
  const [cookies, setCookies] = useCookies(["name"]);
  const [currentCategory, setCurrentCategory] = useState(null);

  const classes = useStyles();

  const [modalEditOpen, setEditModalOpen] = useState(false);
  const [modalAddOpen, setAddModalOpen] = useState(false);

  const [gameCategoryPicked, setGameCategoryPicked] = useState(false);

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

  const loadCategories = () => {
    axios
      .get(`http://localhost:9000/api/category/get/${user.email}`)
      .then((category) => {
        setMyCategories(category.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:9000/api/category/get/${user.email}`)
        .then((category) => {
          setMyCategories(category.data.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const handleEditModalOpen = (category) => {
    setCurrentCategory(category);
    setEditModalOpen(true);
  };

  const handleEditCategory = () => {
    const categoryId = currentCategory._id;

    axios
      .put(`http://localhost:9000/api/category/update/${categoryId}`, {
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
    axios
      .delete(`http://localhost:9000/api/category/remove/${categoryId}`)
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

  const handleAddCategory = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:9000/api/category/create", {
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
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleOpenCategory = (category) => {
    setTimeout(() => {
      history.push("/category");
    }, 200);
    onPickedCategory(category);
  };

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
      <Button
        type="submit"
        size="small"
        style={buttonStyle}
        color="primary"
        onClick={handleLogout}
      >
        Sign Out
      </Button>
      <div className={classes.paper}>
        <div>
          <Button
            style={addCategoryButtonStyle}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              setAddModalOpen(true);
            }}
          >
            Add Category
          </Button>
          <Typography component="h1" variant="h6">
            Your categories
          </Typography>
        </div>
        <CategoriesList
          myCategories={myCategories}
          handleEditModalOpen={handleEditModalOpen}
          handleDeleteCategory={handleDeleteCategory}
          handleOpenCategory={handleOpenCategory}
          handlePlayCategory={handlePlayCategory}
          showAllCategories={showAllCategories}
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
        {error !== "" ? <Alert severity="error"> {error} </Alert> : ""}
        {success !== "" ? <Alert severity="success"> {success} </Alert> : ""}
      </div>
    </motion.div>
  );
};

export default connect(null, { setUser })(CustomCategories);
