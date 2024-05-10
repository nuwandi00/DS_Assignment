// const express = require("express");
// const connectDb = require("./config/dbConnection");
// const errorHandler = require("./util/errorHandler");
// const dotenv = require("dotenv").config();
// const cors = require("cors");
import express from "express";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./utils/errorHandler.js";
import dotenv from "dotenv";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

// Connect to the database
connectDb();

// Create an Express application instance
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// Set the port
const port = process.env.PORT || 8003;

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());

// Routes
app.use("/api/payment", paymentRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
