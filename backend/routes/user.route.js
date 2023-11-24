const express = require("express");

const { addCart } = require("../controllers/user.controller");
const { deleteCart } = require("../controllers/user.controller");
const { cart } = require("../controllers/user.controller");
const { updateQuanity } = require("../controllers/user.controller");
//xem trang thai don hang
const router = express.Router();

router.route("/addCart").post(addCart); //them vao gio hang /user/addCart
router.route("/deleteCart").delete(deleteCart); //xoa khoi gio hang
router.route("/cart").get(cart); //xem gio hang
router.route("/cart").put(updateQuanity); //them so luong
router.route("/cart/:userId").get(cart);
module.exports = router;
