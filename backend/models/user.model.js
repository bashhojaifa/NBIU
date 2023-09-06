const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: [true, "Email should be unique"],
      validate: [validator.isEmail, "Please Enter a Valid Email"],
    },

    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      trim: true,
      minlength: [6, "Password should be greater than 6 character"],
      select: false,
      // validate(value) {
      //   if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      //     throw new Error('Password must contain at least one letter and one number')
      //   }
      // },
    },

    role: {
      type: String,
      enum: ["ADMIN", "STUDENT"],
      default: "STUDENT",
    },

    passwordChangedAt: {
      type: Date,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    admin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Admin",
    },

    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// userSchema.statics.isMobileTaken = async function (mobile, excludeUserId) {
//   const user = await this.findOne({ mobile, _id: { $ne: excludeUserId } });
//   return !!user;
// };

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// generate jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
