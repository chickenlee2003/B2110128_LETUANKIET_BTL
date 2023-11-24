const express = require("express");

const { addProductCart } = require("../controllers/order.controller");
const { getAllProductCart } = require("../controllers/product.controller");
const { updateProductCartById } = require("../controllers/product.controller");
const { deleteProductCartById } = require("../controllers/product.controller");

const router = express.Router();

// Product routes
router.route("/").post(addProduct);
router.route("/").get(getAllProduct);
router.route("/:productId").get(getProductById);
router.route("/:productId").patch(updateProductById);
router.route("/:productId").delete(deleteProductById);

module.exports = router;
