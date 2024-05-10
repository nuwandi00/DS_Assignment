// const mongoose = require("mongoose");
import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add the user name"],
    },
    // courseName: {
    //   type: String,
    //   required: [true, "Please add the course name"],
    // },
    courses: [
      {
        type: String,
        required: [true, "Please add the course name"],
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Please add the course price"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
