const mongoose = require("mongoose");
const centerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập địa chỉ trung tâm"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Nhập thành phố"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Center", centerSchema);
