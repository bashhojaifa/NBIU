const app = require("./app");
require("dotenv").config();

// import database function
const connectDB = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// call database function
connectDB();

// import port from .env file
const PORT = process.env.PORT || 3031;

// create server
const server = app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
