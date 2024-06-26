import Approval from "../models/approveModel.js";
import Course from "../models/courseModel.js";

const approveCourse = async (req, res) => {
  try {
    if (!req?.body?.code || !req?.body?.status) {
      return res.status(400).json({ message: "Enter all required input fields" });
    }

    const course = await Course.findOne({ code: req.body.code });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (req.body.status === "accept" || req.body.status === "Accept") {
      const result = new Approval({
        code: req.body.code,
        status: req.body.status,
      });

      await result.save();

      res.status(201).json(result);
    } else {
      return res.status(400).json({ message: "Course Approval has been rejected" });
    }
  } catch (error) {
    console.error("Error approving course : ", error);
  }
};

const getApprovedCourses = async (req, res) => {
  try {
    const courses = await Approval.find();
    if (!courses || courses.length === 0) {
      return res.status(204).json({ message: "No Courses Found" });
    }
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { approveCourse, getApprovedCourses };
