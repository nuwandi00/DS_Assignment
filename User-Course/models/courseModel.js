import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    courseFee: {
      type: Number,
      required: true,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
