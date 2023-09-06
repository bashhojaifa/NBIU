const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
    validate(value) {
      if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        throw new Error("Invalid email address");
      }
    },
  },

  address: {
    type: String,
    max: [100, "Address can not exceed 100 characters"],
    required: [true, "Enter Your Address"],
    trim: true,
  },

  designation: {
    type: String,
    max: [50, "Designation can not exceed 50 characters"],
    required: [true, "Enter Your designation"],
    trim: true,
  },
});

/**
 * Check if mobile is taken
 * @param {string} mobile - The user's mobile
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

adminSchema.statics.isMobileTaken = async function (mobile, excludeAdminId) {
  const admin = await this.findOne({
    mobile,
    _id: { $ne: excludeAdminId },
  });
  return !!admin;
};

module.exports = mongoose.model("Admin", adminSchema);
