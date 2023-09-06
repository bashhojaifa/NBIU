const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Admin, User, Student } = require("../models");

// create user
exports.createUser = async (query) => {
  if (await User.isEmailTaken(query.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  const user = await User.create(query);
  return user;
};

// set user id
exports.setUserId = async (tableName, profileId, userId) => {
  if (tableName === "Admin") {
    await Admin.findOneAndUpdate(
      { _id: profileId },
      { $set: { user: userId } }
    );
  }

  if (tableName === "Student") {
    await Student.findOneAndUpdate(
      { _id: profileId },
      { $set: { user: userId } }
    );
  }
};

// create admin
exports.createAdmin = async (query) => {
  if (await Admin.isMobileTaken(query.mobile)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Mobile number already taken");
  }

  const admin = await Admin.create(query);
  return admin;
};

// student create
exports.createStudent = async (studentInfo) => {
  if (await Student.isMobileTaken(studentInfo.mobile)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Mobile number already taken");
  }

  // if (await Admin.isMobileTaken(studentInfo.mobile)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, "Mobile number already taken");
  // }

  const student = await Student.create(studentInfo);
  return student;
};

// login user
exports.loginUser = async (email, password) => {
  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please Enter Email & Password");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }

  return user;
};
