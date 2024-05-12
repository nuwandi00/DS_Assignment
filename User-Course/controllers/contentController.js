import Content from "../models/contentModel.js";
import Course from "../models/courseModel.js";

const getAllContents = async (req, res) => {
  try {
    const contents = await Content.find();
    if (!contents || contents.length === 0) {
      return res.status(204).json({ message: "No Content Found" });
    }
    res.json(contents);
  } catch (error) {
    console.error("Error retrieving course contents : ", error);
  }
};

const createContent = async (req, res) => {
  try {
    if (!req?.body?.link) {
      return res.status(400).json({ message: "Enter all required input fields" });
    }

    const course = await Course.findOne({ code: req.body.code });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const result = new Content({
      code: req.body.code,
      link: req.body.link,
    });

    await result.save();

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating course contents : ", error);
  }
};

const updateContent = async (req, res) => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    const content = await Content.findOne({ _id: req.body.id });
    if (!content) {
      return res.status(400).json({ message: `No content matches ID ${req.body.id}` });
    }

    if (req.body?.link) content.link = req.body.link;
    if (req.body?.code) content.code = req.body.code;

    const updatedContent = await content.save();
    res.status(200).json(updatedContent);
  } catch (error) {
    console.log(error);
  }
};

const deleteContent = async (req, res) => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    const content = await Content.findOne({ _id: req.body.id });
    if (!content) {
      return res.status(204).json({ message: `No content matches with ID ${req.body.id}` });
    }

    const result = await content.deleteOne({ _id: req.body.id });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log("Error deleting course content : ", error);
  }
};

export { getAllContents, createContent, updateContent, deleteContent };
