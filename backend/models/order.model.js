const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    require: true,
  },
  orderdate: {
    type: Date,
    required: true,
  },
  shipDate: {
    type: Date,
    required: true,
  },
  orderState: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
