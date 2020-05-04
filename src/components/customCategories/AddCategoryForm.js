import React from "react";

const AddCategoryForm = (props) => {
  const {
    handleAddCategory,
    categoryName,
    categoryDescription,
    handleInputChange,
  } = props;

  return (
    <form onSubmit={handleAddCategory} className="col-sm-4">
      <div>
        <div>
          <label className="text-white">Nazwa Kategorii</label>
          <input
            type="text"
            name="categoryName"
            value={categoryName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="text-white">Opis Kategorii</label>
          <input
            type="text"
            name="categoryDescription"
            value={categoryDescription}
            onChange={handleInputChange}
          />
        </div>
        <button> Add Category</button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
