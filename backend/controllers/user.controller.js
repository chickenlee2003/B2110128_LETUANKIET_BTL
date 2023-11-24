const mongoose = require("mongoose");
// const createError = require("http-errors");
const Product = require("../models/product.model");
const User = require("../models/user.model.js");

const addCart = async (req, res, next) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  try {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của người dùng chưa
    const user = await User.findById(userId);
    const existingProductIndex = user.cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, cập nhật số lượng
      user.cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      user.cart.products.push({ product: productId, quantity });
    }

    // Lưu thông tin người dùng sau khi cập nhật giỏ hàng
    await user.save();

    return res.status(200).json({ success: true, message: "Posted to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Loi",
    });
  }
};
// const cart = async (req, res, next) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findById(userId);
//     if (!user.cart)
//       return res.json({
//         msg: "Không có sản phẩm trong giỏ hàng",
//       });
//     return res.status(200).json(user.cart);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Loi",
//     });
//   }
// };

const cart = async (req, res, next) => {
  const userId = req.params.userId; // Use req.params to get the user ID
  try {
    const user = await User.findById(userId);
    if (!user.cart)
      return res.json({
        msg: "Không có sản phẩm trong giỏ hàng",
      });
    return res.status(200).json(user.cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Loi",
    });
  }
};
const deleteCart = async (req, res, next) => {
  const userId = req.body.userId;
  const productId = req.body.productId;

  try {
    const user = await User.findById(userId);
    // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng không
    const existingProductIndex = user.cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (existingProductIndex !== -1) {
      // Nếu sản phẩm tồn tại, xóa khỏi giỏ hàng
      user.cart.products.splice(existingProductIndex, 1);

      // Lưu thông tin người dùng sau khi cập nhật giỏ hàng
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Removed from cart" });
    } else {
      // Nếu sản phẩm không tồn tại trong giỏ hàng
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Loi",
    });
  }
};
const updateQuanity = async (req, res, next) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  try {
    const user = await User.findById(userId);
    if (!user.cart)
      return res.json({
        msg: "Không có sản phẩm trong giỏ hàng",
      });
    // Check if the product exists in the cart
    const existingProductIndex = user.cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      // If the product exists, update the quantity
      user.cart.products[existingProductIndex].quantity = quantity;

      // Save the user with the updated cart
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Quantity updated", cart: user.cart });
    } else {
      // If the product doesn't exist in the cart
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Loi",
    });
  }
};

module.exports = {
  addCart,
  cart,
  deleteCart,
  updateQuanity,
};
