import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import courseRoute from "./routes/courseRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import approveRoutes from "./routes/approveRoutes.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/course", courseRoute);
app.use("/api/content", contentRoutes);
app.use("/api/approve", approveRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use("/", (req, res, next) => {
  return res.status(200).json({ msg: "User-Course Project is running" });
});

app.listen(8002, () => {
  connect();
  console.log("Server is running on port 8002.");
});
