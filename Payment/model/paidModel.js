import mongoose from "mongoose";
const PaidSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },

    // students: {
    //   type: [String], // Change the type to an array of strings
    //   default: [], // Set default value to an empty array
    // },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Paid", PaidSchema);
