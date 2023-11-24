const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username cannot be empty :("],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password cannot be empty!"],
  },
  email: {
    type: String,
    required: [true, "email cannot be empty!"],
    unique: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  cart: {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
  },
});
// mongoose.model(<mongodb collection name>, our schema)

const User = mongoose.model("User", userSchema);

module.exports = User;
