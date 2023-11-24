const Staff = require("../models/staff.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registeradmin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { staffname, password, position, address, phone } = req.body;
    if (!staffname || !password) {
      return res.json({
        status: "bad",
        msg: "Không được để trống tài khoản hoắc mật khẩu!",
      });
    }

    if (staffname.length < 4) {
      return res.json({
        status: "bad",
        msg: "Username phải chứa ít nhất 4 kí tự!",
      });
    }

    if (staffname.length > 20) {
      return res.json({
        status: "bad",
        msg: "Username không được dài hơn 20 kí tự!",
      });
    }

    if (password.trim().length < 5) {
      return res.json({
        status: "bad",
        msg: "Password phải chứa ít nhất 5 kí tự!",
      });
    }

    const existUser = await Staff.findOne({ staffname });

    if (existUser) {
      return res.json({
        status: "bad",
        msg: "Username đã tồn tại!",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await new Staff({
      staffname,
      password: hashedPass,
      position,
      address,
      phone,
    });

    const savedUser = await newUser.save();

    const token = await jwt.sign({ savedUser }, "tokensecret");

    res.json({
      status: "ok",
      msg: "Bạn đã đăng ký thành công!",
      user: savedUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: "loi dki ad" });
  }
};

const loginadmin = async (req, res, next) => {
  try {
    const { staffname, password } = req.body;
    console.log(staffname, password);

    if (!staffname || !password) {
      return res.json({
        status: "bad",
        msg: "Không được để trống tài khoản hoắc mật khẩu!",
      });
    }
    const existUser = await Staff.findOne({ staffname: staffname });
    if (!existUser) {
      return res.json({
        status: "bad",
        msg: "staffname không tồn tại!",
      });
    }
    const comparePass = await bcrypt.compare(password, existUser.password);
    if (!comparePass) {
      return res.json({
        status: "bad",
        msg: "Sai mật khẩu",
      });
    }
    // const token = await jwt.sign({ existUser }, "tokensecret");
    // const decodedToken = await jwt.decode(token);
    // console.log(decodedToken);
    const token = await jwt.sign({ staffId: existUser._id }, "tokensecret");
    const decodedToken = await jwt.verify(token, "tokensecret");
    console.log(decodedToken);

    res.json({
      status: "ok",
      msg: "Bạn đã đăng nhập thành công!",
      user: existUser,
      token,
    });
  } catch (error) {
    console.log("error.message");
  }
};
module.exports = { loginadmin, registeradmin };
