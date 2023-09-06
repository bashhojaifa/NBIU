const httpStatus = require("http-status");
const catchAsync = require("../middleware/asyncErrors.js");
const sendToken = require("../utils/jwtToken");
const { authServices } = require("../services");

// admin register
exports.adminRegister = catchAsync(async (req, res) => {
  const { name, mobile, email, password, address, designation } = req.body;

  const admin = await authServices.createAdmin({
    name,
    mobile,
    email,
    address,
    designation,
  });

  let user;
  if (admin) {
    user = await authServices.createUser({
      role: "admin",
      email,
      password,
      admin: admin._id,
    });
  }

  if (user) {
    authServices.setUserId("Admin", admin._id, user._id);
  }

  sendToken(user, httpStatus.CREATED, res);
});

// student register
exports.studentRegister = catchAsync(async (req, res) => {
  console.log(req.body);
  const {
    name,
    mobile,
    currentAddress,
    permanentAddress,
    studentId,
    batch,
    department,
    passingYear,
    cgpa,
    jobStatus,
    designation,
    jobLocation,
    email,
    password,
  } = req.body;

  const student = await authServices.createStudent({
    name,
    email,
    mobile,
    currentAddress,
    permanentAddress,
    studentId,
    batch,
    department,
    passingYear,
    cgpa,
    jobStatus,
    designation,
    jobLocation,
  });

  let user;
  if (student) {
    user = await authServices.createUser({
      role: "STUDENT",
      email,
      password,
      student: student._id,
    });
  }
  if (user) {
    authServices.setUserId("Student", student._id, user._id);
  }

  sendToken(user, httpStatus.CREATED, res);
});

// login user
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await authServices.loginUser(email, password);

  sendToken(user, httpStatus.OK, res);
});
