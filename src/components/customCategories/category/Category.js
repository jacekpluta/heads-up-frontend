import React, { useEffect } from "react";
import axios from "axios";

import BackButton from "../../BackButton";
import { motion } from "framer-motion";
import Button from "@material-ui/core/Button";

import EntriesList from "./EntriesList";

import { useCookies } from "react-cookie";

import { pageVariantsLogin } from "../../PageVariants";
import { pageTransition } from "../../PageTransition";
import { setUser } from "../../../actions";
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

const CustomCategories = (props) => {
  const { setUser, user, pickedCategory } = props;

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
      history.push("/customCategories");
    }, 200);
  };

  const handleLogout = () => {
    axios.get("https://headsupbackend.herokuapp.com/logout").then((data) => {
      if (data.status === 200 && data.data.message === "Logged out") {
        setTimeout(() => {
          history.push("/login");
        }, 200);

        setUser(null);
        setCookies("user", null, { path: "/" });
      }
    });
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
        Wyloguj
      </Button>

      <EntriesList pickedCategory={pickedCategory} user={user} />
    </motion.div>
  );
};

export default connect(null, { setUser })(CustomCategories);
