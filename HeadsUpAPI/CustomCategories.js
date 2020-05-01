const express = require("express");
const router = express.Router();
const CustomCategorySchema = require("./models/CategoryModel");
const { Validator } = require("node-input-validator");

// router.get("/", async (req, res) => {
//   await CustomCategorySchema.find({}).toArray((err, documents) => {
//     if (err) throw err;

//     console.log(documents);
//   });
// });

router.post("/", async (req, res) => {
  const { name, id, email, description } = req.body;

  let errors = [];

  if (!name) {
    errors.push("Podaj nazwę kategorii");
  }
  if (name.length < 3) {
    errors.push("Nazwa kategorii powinna zawierać conajmniej trzy znaki");
  }

  if (errors.length > 0) {
    res.json({ error: errors });
  } else {
    const customCategory = new CustomCategorySchema({
      id: id,
      name: name,
      userEmail: userEmail,
    });

    customCategory
      .save()
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
