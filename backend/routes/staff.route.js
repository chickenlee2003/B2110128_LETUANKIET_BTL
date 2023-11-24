const express = require("express");
const router = express.Router();
const { registeradmin } = require("../controllers/staff.controller");
const { loginadmin } = require("../controllers/staff.controller");
// const { logout } = require("../controllers/auth.controller");

//Login route là /admin/loginadmin
router.post("/loginadmin", loginadmin);
router.post("/registeradmin", registeradmin);

//Logout route
// router.post("/logout", logout);

module.exports = router;
