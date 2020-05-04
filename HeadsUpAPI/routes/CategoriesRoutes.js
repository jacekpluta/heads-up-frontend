var Categories = require("../controllers/CategoriesController");

module.exports = function (router) {
  router.post("/create", Categories.createCategory);
  router.get("/get", Categories.getCategories);
  router.get("/get/:email", Categories.getCategory);
  router.put("/update/:id", Categories.updateCategory);
  router.delete("/remove/:id", Categories.removeCategory);
};
