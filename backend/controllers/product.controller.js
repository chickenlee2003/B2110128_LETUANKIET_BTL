const mongoose = require("mongoose");
const createError = require("http-errors");
const Product = require("../models/product.model");
// add a new Product
const addProduct = async (req, res, next) => {
  try {
    // const { name, description, price, stock, note, images } = reeq.body;
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    if (!Product) throw createError.NotFound("Failed to add a new Product.");
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
};
// get all Products
const getAllProduct = async (req, res, next) => {
  try {
    const Products = await Product.find();

    if (!Product) throw createError.NotFound("No Products found.");
    res.status(200).json(Products);
  } catch (error) {
    next(error);
  }
};

// get Product by id
const getProductById = async (req, res, next) => {
  try {
    //query or params
    //query
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) throw createError.NotFound("Product does not exist.");
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid product id."));
    }
    next(error);
  }
};
// //get by name
const getbyname = async (req, res, next) => {
  try {
    //params
    const name = req.query.name;
    console.log(name);
    // if (!name) {
    //   return res.status(400).json({ error: "Name should not be empty." });
    // }
    const products = await Product.find({
      name: { $regex: new RegExp(name, "i") },
    });

    // Assuming 'name' is a property in your Product model

    if (products.length === 0)
      return res.status(404).json({ error: "khong tim thay san pham" });
    return res.json(products);
  } catch (error) {
    console.error(error);

    // Handle other types of errors here
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update product by id
const updateProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) throw createError.NotFound("Product does not exist.");
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid product id."));
    }
    next(error);
  }
};

// delete product by id
const deleteProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) throw createError.NotFound("Product does not exist.");
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid product id."));
    }
    next(error);
  }
};

//type là note
const getbytype = async (req, res, next) => {
  try {
    //Tại vì type nhưng lúc tạo csdl lỡ ghi là note
    const note = req.query.note;
    console.log(note);
    const products = await Product.find({
      note: { $regex: new RegExp(note, "i") },
    });
    if (products.length === 0)
      return res
        .status(404)
        .json({ error: "khong tim thay san pham cua nhan hang" });
    return res.json(products);
  } catch (error) {
    console.error(error);
    // Handle other types of errors here
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getbyname,
  getbytype,
};

// //get all products
// router.get("/products", async (req, res) => {
//     try {
//       const products = await Product.find();
//       console.log(products);
//       return res.render("index.ejs", context);
//     } catch (error) {
//       console.log(error);
//     }
//   });
//   //get one
//   router.get("/products/:id", async (req, res) => {
//       try {
//         const products = await Product.findOne();
//         console.log(products);
//         return res.render("index.ejs", context);
//       } catch (error) {
//         console.log(error);
//       }
//     });
