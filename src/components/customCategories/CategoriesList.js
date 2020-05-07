import React from "react";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHead from "@material-ui/core/TableHead";
import { ParStyleTable } from "../../styles/Layout";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";

const outerTheme = createMuiTheme({
  palette: {},
});

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});

const CategoriesList = (props) => {
  const {
    myCategories,
    handleEditModalOpen,
    handleDeleteCategory,
    handleOpenCategory,
    handlePlayCategory,
    showAllCategories,
  } = props;

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, myCategories.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");

  const columns = [
    {
      id: "name",
      label: "Name",
      minWidth: 50,
      maxWidth: 50,
      align: "center",
    },
    {
      id: "description",
      label: "Description",
      minWidth: 50,
      maxWidth: 110,
      align: "center",
    },
    {
      id: "play",
      label: "Play",
      minWidth: 50,
      align: "center",
    },
    {
      id: "open",
      label: "Change questions",
      minWidth: 50,
      align: "center",
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 50,
      align: "center",
    },
    {
      id: "delete",
      label: "Delete",
      minWidth: 50,
      align: "center",
    },
  ];

  const columnsAllCategories = [
    {
      id: "name",
      label: "Name",
      minWidth: 40,
      maxWidth: 50,
      align: "center",
    },
    {
      id: "userEmail",
      label: "User",
      minWidth: 40,
      align: "center",
    },
    {
      id: "play",
      label: "Play",
      minWidth: 40,
      align: "center",
    },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {showAllCategories
              ? columnsAllCategories.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))
              : columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
          </TableRow>
        </TableHead>

        {myCategories.length > 0 && !showAllCategories ? (
          <TableBody>
            {stableSort(myCategories, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => (
                <TableRow key={category._id}>
                  <ThemeProvider theme={outerTheme}>
                    <TableCell component="th" scope="row" align="center">
                      {category.name}
                    </TableCell>
                    <TableCell align="center">
                      {category.description ? category.description : "---"}
                    </TableCell>
                    <ThemeProvider theme={innerTheme}>
                      <TableCell style={{ width: 50 }} align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handlePlayCategory(category)}
                        >
                          PLAY
                        </Button>
                      </TableCell>
                      <TableCell style={{ width: 50 }} align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleOpenCategory(category)}
                        >
                          QUESTIONS
                        </Button>
                      </TableCell>
                    </ThemeProvider>
                    <TableCell style={{ width: 50 }} align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditModalOpen(category)}
                      >
                        EDIT
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: 50 }} align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        DELETE
                      </Button>
                    </TableCell>
                  </ThemeProvider>
                </TableRow>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        ) : showAllCategories ? (
          <TableBody>
            {stableSort(myCategories, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => (
                <TableRow key={category._id}>
                  <ThemeProvider theme={outerTheme}>
                    <TableCell component="th" scope="row" align="center">
                      {category.name}
                    </TableCell>

                    <TableCell align="center">{category.email}</TableCell>
                    <ThemeProvider theme={innerTheme}>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handlePlayCategory(category)}
                        >
                          PLAY
                        </Button>
                      </TableCell>
                    </ThemeProvider>
                  </ThemeProvider>
                </TableRow>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody>
            <ParStyleTable>NO CATEGORIES</ParStyleTable>
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        )}

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5]}
              count={myCategories.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CategoriesList;

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 320,
  },
});
