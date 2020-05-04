import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoriesList from "./CategoriesList";

import BackButton from "../BackButton";
import { motion } from "framer-motion";
import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";

import TextField from "@material-ui/core/TextField";
import AddCategoryForm from "./AddCategoryForm";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { useCookies } from "react-cookie";

import Modal from "@material-ui/core/Modal";

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

  const [myCategories, setMyCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cookies, setCookies] = useCookies(["name"]);

  const [modalOpen, setModalOpen] = useState(false);

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

  const handleEditCategory = (categoryId) => {};

  const handleDeleteCategory = (categoryId) => {
    axios
      .delete(`http://localhost:9000/api/category/remove/${categoryId}`)
      .then(() => {
        const newCategories = myCategories.filter((category) => {
          if (category._id !== categoryId) return category;
        });
        setMyCategories(newCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (event) => {
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

  const handleAddCategory = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:9000/api/category/create", {
        email: user.email,
        name: categoryName,
        description: categoryDescription,
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setModalOpen(false);
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
          <Typography component="h1" variant="h5">
            Twoje kategorie
          </Typography>
        </div>
        <CategoriesList
          myCategories={myCategories}
          handleEditCategory={handleEditCategory}
          handleDeleteCategory={handleDeleteCategory}
        ></CategoriesList>
        <Grid container spacing={2}>
          <AddCategoryForm
            handleInputChange={handleInputChange}
            handleAddCategory={handleAddCategory}
            categoryName={categoryName}
            categoryDescription={categoryDescription}
          ></AddCategoryForm>
          {/* <Grid item xs={12}>
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

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="categoryDescription"
              label="Category Description"
              name="categoryDescription"
              type="text"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
  </Grid> */}
        </Grid>

        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <h2>Edit category</h2>
          <Button
            type="submit"
            variant="contained"
            size="small"
            style={buttonStyle}
            color="primary"
            onClick={handleEditCategory}
          >
            Change details
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="small"
            style={buttonStyle}
            color="primary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal>

        {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleAddCategory}
        >
          Add category
        </Button> */}

        {error !== "" ? <Alert severity="error"> {error} </Alert> : ""}
        {success !== "" ? <Alert severity="success"> {success} </Alert> : ""}
      </Container>
    </motion.div>
  );
};

export default connect(null, { setUser })(CustomCategories);
