import React from "react";

const EditCategoryForm = (props) => {
  return (
    <form className="col-sm-4">
      <div>
        <div>
          <label className="text-white">Food name</label>
          <input
            type="text"
            name="food"
            value={props.food}
            onChange={props.handleInputChange}
          />
        </div>
        <div>
          <label className="text-white">Food cost</label>
          <input
            type="number"
            name="cost"
            value={props.cost}
            onChange={props.handleInputChange}
          />
        </div>
        <button onClick={props.updateFoodItem}> Update </button>
        <button onClick={() => props.setEditing(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditCategoryForm;
