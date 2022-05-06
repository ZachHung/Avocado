const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Products = new Schema(
  {
    name: String,
    category: String,
    image: String,
    price: Number,
    desc: String,
  },
  { collection: "products" }
);

module.exports = mongoose.model("products", Products);
