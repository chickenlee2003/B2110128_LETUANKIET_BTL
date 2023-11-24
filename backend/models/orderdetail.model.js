const mongoose = require("mongoose");

const OrderdetailSchema = new mongoose.Schema({
  orderNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  number: {
    type: Number,
    required: true,
  },
  priceorder: {
    type: Number,
    required: true,
  },
  sale: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Orderdetail", OrderdetailSchema);
