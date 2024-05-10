import mongoose from "mongoose";
const EnrollemetSchema = new mongoose.Schema(
  {
   
    code: {
      type: String,
      required: true,
    },
    
    students:{
      type: [String],  // Change the type to an array of strings
      default: [],     // Set default value to an empty array
    },
   
    
  },
  { timestamps: true }
);

export default mongoose.model("Enrollemet", EnrollemetSchema);
