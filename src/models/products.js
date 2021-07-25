const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  URL: {
    type: String,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
});

const products = mongoose.model("Product", productSchema);

module.exports = products;