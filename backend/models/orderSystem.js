const mongoose = require("mongoose");

const orderSystemSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Nhập email"],
    trim: true,
  },
  fullName: {
    type: String,
    required: [true, "Nhập tên người mượn"],
    trim: true,
  },
  course: {
    type: String,
    required: [true, "Nhập tên khóa muốn học"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Nhập số điện thoại"],
  },
  address: {
    type: String,
    required: [true, "Nhập địa chỉ của bạn"],
  },
  note: {
    type: String,
    required: [, "Nhập lịch học của bạn"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Đang xử lý",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OrderSystem", orderSystemSchema);
