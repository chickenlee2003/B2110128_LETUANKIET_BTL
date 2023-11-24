const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name cannot be empty! "],
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    min: [0, "you cannot add a negative number!"],
    required: [true, "price cannot be empty!"],
  },
  stock: {
    type: Number,
    min: [0, "you cannot add a negative number!"],
  },
  note: {
    type: String,
  },
  images: {
    type: String,
    required: [true, "image cannot be empty! "],
  },
});
// mongoose.model(<mongodb collection name>, our schema)
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

// we will access the array data through our 'database'
// without our module.exports we would not be able to access data from this file
