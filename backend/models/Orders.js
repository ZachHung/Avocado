const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Orders = new Schema(
  {
    customerInfo: {
      province: String,
      district: String,
      ward: String,
      addressdetail: String,
    },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("orders", Orders);
