const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Route Import
const auth = require("./routes/auth.routes.js");

// import middleware
const errorMiddleware = require("./middleware/error");

// export json into app
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// export cookie parser
app.use(cookieParser());

// export cors
app.use(cors());

// app.use(fileUpload());

// export product into app
app.use("/api/v1", auth);

// middleware for error
app.use(errorMiddleware);

module.exports = app;
