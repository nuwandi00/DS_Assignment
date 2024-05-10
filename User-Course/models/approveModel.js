import mongoose from "mongoose";

const ApprovedCourseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Approvals", ApprovedCourseSchema);
