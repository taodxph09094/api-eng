const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  centerInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  type: {
    type: String,
    required: [true, "Nhập kiểu lớp"],
  },
  courseItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      course: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
        required: true,
      },
    },
  ],
  peopleOfClass: {
    type: Number,
    required: [true, "Nhập số người"],
    maxLength: [2, "không vượt quá 2 ký tự"],
    default: 0,
  },
  people: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  numberOfDays: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: Date,
  orderStatus: {
    type: String,
    required: true,
    default: "Đang xử lý",
  },
});

module.exports = mongoose.model("Class", classSchema);
