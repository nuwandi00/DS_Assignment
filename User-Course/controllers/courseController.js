import Course from "../models/courseModel.js";

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
      return res.status(204).json({ message: "No Courses Found" });
    }
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createCourse = async (req, res) => {
  if (!req?.body?.name || !req?.body?.code || !req?.body?.description || !req?.body?.courseFee) {
    return res.status(400).json({ message: "Enter all required input fields" });
  }

  try {
    const result = new Course({
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      courseFee: req.body.courseFee,
    })

    // if (req.file) {
    //   result.image = req.file.path;
    // }

    await result.save();

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCourse = async (req, res) => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    const course = await Course.findOne({ _id: req.body.id });
    if (!course) {
      return res
        .status(404)
        .json({ message: `No course matches ID ${req.body.id}` });
    }

    if (
      !req?.body?.courseName ||
      !req?.body?.code ||
      !req?.body?.description ||
      !req?.body?.courseFee ||
      !req?.body?.category
    ) {
      return res
        .status(400)
        .json({ message: "Enter all required input fields" });
    }

    course.courseName = req.body.courseName;
    course.code = req.body.code;
    course.description = req.body.description;
    course.courseFee = req.body.courseFee;
    course.category = req.body.category;

    if (req.file && req.file.path) {
      course.image = req.file.path;
    }

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    const course = await Course.findOne({ _id: req.body.id });
    if (!course) {
      return res
        .status(204)
        .json({ message: `No course matches with ID ${req.body.id}` });
    }

    const result = await course.deleteOne({ _id: req.body.id });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourse = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    const course = await Course.findOne({ _id: req.params.id });
    if (!course) {
      return res
        .status(204)
        .json({ message: `No Course matches with ID ${req.params.id}` });
    }

    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCourseCode = async (code) => {
  try {
    const courseCode = await Course.findOne({ code }).exec();
    console.log(courseCode);
    return courseCode;
  } catch (err) {
    console.error(err);
  }
};

export {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseCode,
};
