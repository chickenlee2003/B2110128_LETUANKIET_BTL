const mongoose = require("mongoose");
const createError = require("http-errors");
const Order = require("../models/order.model");

const addOrder = async (req, res, next) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
};
//getall
const getAllOrder = async (req, res, next) => {
  try {
    const Orders = await Order.find();

    if (!Order) throw createError.NotFound("No Orders found.");
    res.status(200).json(Orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrder,
  getAllOrder,
};
