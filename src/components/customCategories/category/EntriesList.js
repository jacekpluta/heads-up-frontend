import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

import Alert from "@material-ui/lab/Alert";
import { forwardRef } from "react";

import Typography from "@material-ui/core/Typography";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
 

    backgroundColor: "#013166",


  },
}));

const EntriesList = (props) => {
  const { pickedCategory } = props;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categoryEntries, setCategoryEntries] = useState([]);

  const classes = useStyles();

  const [state] = useState({
    columns: [{ title: "Question", field: "name" }],
    data: [],
  });

  useEffect(() => {
    if (pickedCategory) {
      axios
        .get(
          `https://headsupbackend.herokuapp.com/api/category/getById/${pickedCategory._id}`
        )
        .then((category) => {
          setCategoryEntries(category.data.categories[0].questions);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pickedCategory]);

  const handleUpdateEntries = (questions) => {
    axios
      .put(
        `https://headsupbackend.herokuapp.com/api/category/update/${pickedCategory._id}`,
        {
          email: pickedCategory.email,
          name: pickedCategory.name,
          description: pickedCategory.description,
          questions: questions,
        }
      )
      .then((category) => {
        if (category.data.error) {
          setError(category.data.error[0]);
          setSuccess("");
        } else {
          setError("");
          setSuccess("Entry updated");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.paper}>
   
      <MaterialTable
        icons={tableIcons}
        title={pickedCategory && pickedCategory.name}
        columns={state.columns}
        data={categoryEntries ? categoryEntries : state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setCategoryEntries((prevState) => {
                const questions = [...prevState];
                return [...questions, newData];
              });

              const questions = [...categoryEntries, newData];

              resolve(handleUpdateEntries(questions));
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              if (oldData) {
                setCategoryEntries((prevState) => {
                  const questions = [...prevState];
                  questions[questions.indexOf(oldData)] = newData;
                  return [...questions];
                });

                const questions = [...categoryEntries];
                questions[questions.indexOf(oldData)] = newData;
                resolve(handleUpdateEntries(questions));
              }
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setCategoryEntries((prevState) => {
                const questions = [...prevState];
                questions.splice(questions.indexOf(oldData), 1);
                return questions;
              });

              const questions = [...categoryEntries];
              questions.splice(questions.indexOf(oldData), 1);

              resolve(handleUpdateEntries(questions));
            }),
        }}
      />
      {error !== "" ? <Alert severity="error"> {error} </Alert> : ""}
      {success !== "" ? <Alert severity="success"> {success} </Alert> : ""}
    </div>
  );
};

export default EntriesList;

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
