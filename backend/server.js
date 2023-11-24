const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const staffRouter = require("./routes/staff.route");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
//mongodb+srv://tuankiet191103:<password>@cluster0.bnbfcbm.mongodb.net/?retryWrites=true&w=majority

//const userRoutes = require("./routes/auth.route");
//app.use("/api", userRoutes);
mongoose
  .connect("mongodb://127.0.0.1:27017/DongHoStore")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send({ message: "Welcome to contact shop application." });
});

app.use("/auth", require("./routes/auth.route"));
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/admin", staffRouter);
app.listen(PORT, () => {
  console.log(`Servcer is running on port http://localhost:${PORT}.`);
});
