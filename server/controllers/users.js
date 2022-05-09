const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Get all users
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users=await User.find();
    res
    .status(200)
    .json({success:true, count:users.length, data: users})

});

// @desc      Get single user
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Create user
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc      Update user
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(
      new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Delete user
exports.deleteUser = asyncHandler(async (req, res, next) => {
 const user= await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
