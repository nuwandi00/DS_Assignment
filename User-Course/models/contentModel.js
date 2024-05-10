import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contents", ContentSchema);
