const express = require("express");

const { addProduct } = require("../controllers/product.controller");
const { getAllProduct } = require("../controllers/product.controller");
const { getProductById } = require("../controllers/product.controller");
const { updateProductById } = require("../controllers/product.controller");
const { deleteProductById } = require("../controllers/product.controller");
const { getbyname } = require("../controllers/product.controller");
const { getbytype } = require("../controllers/product.controller");

const router = express.Router();

// Product routes
router.route("/").post(addProduct);
router.route("/").get(getAllProduct);
router.route("/getbyname").get(getbyname);
router.route("/getbytype").get(getbytype);

router.route("/:productId").get(getProductById);
router.route("/:productId").patch(updateProductById);
router.route("/:productId").delete(deleteProductById);

module.exports = router;
