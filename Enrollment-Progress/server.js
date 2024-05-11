import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoutes.js";
import courseRoute from "./routes/courseRoutes.js";
import cookieParser from "cookie-parser";
import enrollementRoute from "./routes/enrollementRoutes.js";
import paidRoute from "./routes/paidRoutes.js";
import progressRoute from "./routes/progressRoute.js";
import cors from "cors";

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
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/enrollement", enrollementRoute);
app.use("/api/course", courseRoute);
app.use("/api/paid", paidRoute);
app.use("/api/progress", progressRoute);

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
  return res
    .status(200)
    .json({ msg: "Enrollment-Progress Project is running" });
});

app.listen(8001, () => {
  connect();
  console.log("Server is running on port 8001.");
});
