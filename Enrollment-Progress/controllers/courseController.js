import Course from "../models/CourseModel.js";

export const createCourse = async (req, res, next) => {
  const newCourse = new Course(req.body);

  try {
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
  } catch (err) {
    next(err);
  }
};
export const updateCourse = async (req, res, next) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (err) {
    next(err);
  }
};
export const deleteCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json("Course has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};
export const getCourses = async (req, res, next) => {
  try {
    const course = await Course.find();
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
};
