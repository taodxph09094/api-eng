const Course = require("../models/courseModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createCourse = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "courses",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    course,
  });
});

// Get All Product
exports.getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const coursesCount = await Course.countDocuments();

  const apiFeature = new ApiFeatures(Course.find(), req.query)
    .search()
    .filter();

  let courses = await apiFeature.query;

  let filteredCoursesCount = courses.length;

  apiFeature.pagination(resultPerPage);

  courses = await apiFeature.query;

  res.status(200).json({
    success: true,
    courses,
    coursesCount,
    resultPerPage,
    filteredCoursesCount,
  });
});

// Get All Product (Admin)
exports.getAdminCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await Course.find();

  res.status(200).json({
    success: true,
    courses,
  });
});

// Get Product Details
exports.getCourseDetails = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHander("Không tìm thấy khóa học", 404));
  }

  res.status(200).json({
    success: true,
    course,
  });
});

// Update Product -- Admin

exports.updateCourse = catchAsyncErrors(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHander("Không tìm thấy khóa học", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < course.images.length; i++) {
      await cloudinary.v2.uploader.destroy(course.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "courses",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    course,
  });
});

// Delete Product

exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < course.images.length; i++) {
    await cloudinary.v2.uploader.destroy(course.images[i].public_id);
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công",
  });
});

// Create New Review or Update the review
exports.createCourseReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, courseId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const course = await Course.findById(courseId);

  const isReviewed = course.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    course.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    course.reviews.push(review);
    course.numOfReviews = course.reviews.length;
  }

  let avg = 0;

  course.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  course.ratings = avg / course.reviews.length;

  await course.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getCourseReviews = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.query.id);

  if (!course) {
    return next(new ErrorHander("Không tìm thấy khóa học", 404));
  }

  res.status(200).json({
    success: true,
    reviews: course.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.query.courseId);

  if (!course) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 404));
  }

  const reviews = course.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Course.findByIdAndUpdate(
    req.query.courseId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
