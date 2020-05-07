import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

const AddCategoryForm = (props) => {
  const {
    handleAddCategory,
    categoryName,
    categoryDescription,
    handleInputAddCategoryChange,
    classes,
    modalAddOpen,
    handleCloseAddModal,
  } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalAddOpen}
      onClose={handleCloseAddModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalAddOpen}>
        <div className={classes.paperModal}>
          <h2 id="transition-modal-title">Add category</h2>{" "}
          <TextField
            variant="outlined"
            required
            fullWidth
            id="categoryName"
            label="Category name"
            name="categoryName"
            type="text"
            value={categoryName}
            onChange={handleInputAddCategoryChange}
          />
          <TextField
            variant="outlined"
            fullWidth
            id="categoryDescription"
            label="Opis kategorii"
            name="categoryDescription"
            type="text"
            value={categoryDescription}
            onChange={handleInputAddCategoryChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddCategory}
            style={{ marginTop: "5px", width: "49.7%" }}
          >
            Add
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleCloseAddModal}
            style={{ marginTop: "5px", width: "49.7%" }}
          >
            Cancel
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddCategoryForm;
