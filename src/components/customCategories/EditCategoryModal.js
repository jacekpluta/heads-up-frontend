import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

const AddCategoryForm = (props) => {
  const {
    handleEditCategory,
    currentCategory,
    classes,
    modalEditOpen,
    handleCloseEditModal,
    handleInputCurrentCategoryChange,
  } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalEditOpen}
      onClose={handleCloseEditModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalEditOpen}>
        <div className={classes.paperModal}>
          <h2 id="transition-modal-title">Zmień nazwę kategorii</h2>{" "}
          <TextField
            variant="outlined"
            required
            fullWidth
            id="categoryName"
            name="categoryName"
            type="text"
            value={currentCategory ? currentCategory.name : ""}
            onChange={handleInputCurrentCategoryChange}
          />
          <TextField
            variant="outlined"
            fullWidth
            id="categoryDescription"
            name="categoryDescription"
            type="text"
            value={currentCategory ? currentCategory.description : ""}
            onChange={handleInputCurrentCategoryChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleEditCategory}
            style={{ marginTop: "5px", width: "49.6%" }}
          >
            Edit
          </Button>
          {"  "}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleCloseEditModal}
            style={{ marginTop: "5px", width: "49.6%" }}
          >
            Cancel
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddCategoryForm;
