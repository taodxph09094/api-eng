const Center = require("../models/addressModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create
exports.createCenter = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const center = await Center.create(req.body);
  res.status(201).json({
    success: true,
    center,
  });
});

// Get All
exports.getCenter = catchAsyncErrors(async (req, res, next) => {
  const center = await Center.find();

  res.status(200).json({
    success: true,
    center,
  });
});
// update
exports.updateCenter = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    city: req.body.city,
  };
  const center = await Center.findById(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    center,
  });
});

// Delete Orders

exports.deleteCenter = catchAsyncErrors(async (req, res, next) => {
  const center = await Center.findById(req.params.id);

  if (!center) {
    return next(new ErrorHander("Không tìm thấy trung tâm", 404));
  }
  await center.remove();

  res.status(200).json({
    success: true,
    message: "Xóa trung tâm thành công !",
  });
});
