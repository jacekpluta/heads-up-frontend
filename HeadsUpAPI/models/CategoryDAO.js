var mongoose = require("mongoose");
var categorySchema = require("./CategoryModel");

categorySchema.statics = {
  create: function (data, cb) {
    var hero = new this(data);
    hero.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  getByName: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

var categoryModel = mongoose.model("Categories", categorySchema);
module.exports = categoryModel;
