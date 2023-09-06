const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
    required: [true, "Please Enter Your name"],
    max: [30, "Name can not exceed 50 characters"],
    min: [4, "Name should have greater than 4 characters"],
    trim: true,
  },

  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    max: 11,
    validate(value) {
      if (!value.match(/^01[3456789][\d]{8}/)) {
        throw new Error("Invalid phone Number");
      }
    },
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validator.isEmail, "Please Enter a Valid Email"],
    // validate(value) {
    //   if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    //     throw new Error("Invalid email address");
    //   }
    // },
  },

  permanentAddress: {
    type: String,
    max: [100, "Address can not exceed 100 characters"],
    required: [true, "Enter Your Address"],
    trim: true,
  },

  currentAddress: {
    type: String,
    max: [100, "Address can not exceed 100 characters"],
    required: [true, "Enter Your Address"],
    trim: true,
  },

  batch: {
    type: Number,
    // min: [5, "batch can not exceed 5 characters"],
    required: [true, "Enter Your batch"],
  },

  department: {
    type: String,
    max: [50, "Department can not exceed 50 characters"],
    required: [true, "Enter Your Department"],
    trim: true,
  },

  studentId: {
    type: Number,
    // max: [155, "Student Id can not exceed 5 characters"],
    required: [true, "Enter Your student Id"],
  },

  passingYear: {
    type: Number,
    // max: [5, "Passing year can not exceed 5 characters"],
    required: [true, "Enter Your Passing year"],
  },

  cgpa: {
    type: Number,
    // max: [5, "CGPA year can not exceed 5 characters"],
    required: [true, "Enter Your CGPA year"],
  },

  jobStatus: {
    type: Boolean,
  },

  designation: {
    type: String,
    max: [50, "Designation can not exceed 50 characters"],
    trim: true,
  },

  jobLocation: {
    type: String,
    max: [50, "Job Location can not exceed 50 characters"],
  },
});

/**
 * Check if mobile is taken
 * @param {string} mobile - The Student's mobile
 * @param {ObjectId} [excludeStudentId] - The id of the Student to be excluded
 * @returns {Promise<boolean>}
 */

studentSchema.statics.isMobileTaken = async function (
  mobile,
  excludeCustomerId
) {
  const customer = await this.findOne({
    mobile,
    _id: { $ne: excludeCustomerId },
  });
  return !!customer;
};

module.exports = mongoose.model("Student", studentSchema);
