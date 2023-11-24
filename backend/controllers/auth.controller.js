const User = require("../models/user.model");
// const Staff = require("../models/staff.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    // const { username, password, email, address, phone } = req.body;
    // const data = req.body;
    const { username, password, email, address, phone, cart } = req.body;
    // console.log({ username, password, email, address, phone, cart });
    // console.log(data);
    if (!username || !password) {
      username, password, email, address, phone, cart;
      return res.json({
        status: "bad",
        msg: "Không được để trống tài khoản hoặc mật khẩu!",
      });
    }

    if (username.length < 4 || username.length > 20) {
      return res.json({
        status: "bad",
        msg: "Username phải chứa từ 4 đến 20 kí tự!",
      });
    }

    if (password.trim().length < 5) {
      return res.json({
        status: "bad",
        msg: "Password phải chứa ít nhất 5 kí tự!",
      });
    }

    const existUser = await User.findOne({ username });

    if (existUser) {
      return res.json({
        status: "bad",
        msg: "Username đã tồn tại!",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // Set a default empty cart if not provided
    // const userCart = cart || { products: [] };

    const newUser = new User({
      username,
      password: hashedPass,
      email,
      address,
      phone,
    });

    const savedUser = await newUser.save();

    const token = await jwt.sign({ userId: savedUser._id }, "tokensecret");

    res.json({
      status: "ok",
      msg: "Bạn đã đăng ký thành công!",
      user: savedUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: "loi controler" });
  }
};

//login
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
      return res.json({
        status: "bad",
        msg: "Không được để trống tài khoản hoắc mật khẩu!",
      });
    }
    const existUser = await User.findOne({ username: username });
    if (!existUser) {
      return res.json({
        status: "bad",
        msg: "Username không tồn tại!",
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
    const token = await jwt.sign({ userId: existUser._id }, "tokensecret");
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

const logout = async (req, res, next) => {
  try {
    res.json({
      status: "ok",
      msg: "Bạn đã đăng xuất thành công!",
    });
  } catch (error) {
    console.log("error.message");
  }
};
module.exports = { login, register, logout };
