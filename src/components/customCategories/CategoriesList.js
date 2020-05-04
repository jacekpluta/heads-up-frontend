import React from "react";

const CategoriesList = (props) => {
  const { myCategories, handleEditCategory, handleDeleteCategory } = props;
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Opis</th>
          <th>Akcja</th>
        </tr>
      </thead>
      <tbody>
        {myCategories ? (
          myCategories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => handleEditCategory(category._id)}
                >
                  Edit Category
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  Delete Category
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No Categories</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CategoriesList;
