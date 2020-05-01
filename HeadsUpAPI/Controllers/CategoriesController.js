const categories = require("../models/CategoryDAO");

exports.createCategory = async function (req, res, next) {
  const { id, email, name, description } = req.body;
  const category = {
    id,
    email,
    name,
    description,
  };

  categories.create(category, function (err, category) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        message: "Hero created successfully",
      });
    }
  });
};

exports.getCategories = function (req, res, next) {
  categories.get({}, function (err, categories) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        categories: categories,
      });
    }
  });
};

exports.getCategory = function (req, res, next) {
  categories.get({ name: req.params.name }, function (err, categories) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        categories: categories,
      });
    }
  });
};

exports.updateCategory = function (req, res, next) {
  const { id, email, name, description } = req.body;
  const category = {
    id,
    email,
    name,
    description,
  };

  categories.update({ _id: req.params.id }, category, function (err, category) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        message: "Hero updated successfully",
      });
    }
  });
};

exports.removeCategory = function (req, res, next) {
  categories.delete({ _id: req.params.id }, function (err, category) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        message: "Hero deleted successfully",
      });
    }
  });
};
