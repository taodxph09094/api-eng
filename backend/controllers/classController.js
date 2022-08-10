const Class = require("../models/classModel");
const Course = require("../models/courseModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newClass = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    centerInfo,
    courseItems,
    people,
    peopleOfClass,
    numberOfDays,
    note,
    totalPrice,
  } = req.body;

  const order = await Class.create({
    name,
    centerInfo,
    courseItems,
    people,
    peopleOfClass,
    numberOfDays,
    note,
    totalPrice,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Class.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Không tìm thấy lớp với Id này", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myClass = catchAsyncErrors(async (req, res, next) => {
  const orders = await Class.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllClass = catchAsyncErrors(async (req, res, next) => {
  const orders = await Class.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateClass = catchAsyncErrors(async (req, res, next) => {
  const order = await Class.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Không tìm thấy lớp với Id này", 404));
  }

  if (order.orderStatus === "Đã xong") {
    return next(new ErrorHander("Đã thanh toán thành công", 400));
  }

  if (req.body.status === "Đang xử lý") {
    order.courseItems.forEach(async (o) => {
      await updateStock(o.course, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Đã xong") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const course = await Course.findById(id);

  course.Stock -= quantity;

  await course.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Class.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Không tìm thấy lớp với Id này", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
