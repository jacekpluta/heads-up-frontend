var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categorySchema = new Schema(
  {
    id: {
      type: String,
      unique: false,
      required: true,
    },
    email: {
      type: String,
      unique: false,
      required: true,
    },
    name: {
      type: String,
      unique: false,
      required: true,
    },
    description: {
      type: String,
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = categorySchema;
