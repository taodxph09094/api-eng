const OrderSystem = require("../models/orderSystem");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create order system

exports.createOrderSystem = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const orderSystem = await OrderSystem.create(req.body);
  res.status(201).json({
    success: true,
    orderSystem,
  });
});

// get Single Order
exports.getSingleOrderSystem = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderSystem.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Không tìm thấy thông tin với Id này", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get All order system
exports.getOrderSystem = catchAsyncErrors(async (req, res, next) => {
  const ordersSystem = await OrderSystem.find();

  res.status(200).json({
    success: true,
    ordersSystem,
  });
});
// update Order Status
exports.updateOrderSystem = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderSystem.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Không tìm thấy thông tin với Id này", 404));
  }

  if (order.orderStatus === "Đã xếp lớp") {
    return next(new ErrorHander("Đã xếp lớp", 400));
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Đã xếp lớp") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Delete Orders

exports.deleteOrderSystem = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderSystem.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Không tìm thấy thông tin với Id này", 404));
  }
  await order.remove();

  res.status(200).json({
    success: true,
    message: "Xóa lịch sử thành công !",
  });
});
