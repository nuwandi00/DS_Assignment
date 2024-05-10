import Enrollement from "../models/PaidModel.js";

export const createEnrollement = async (req, res, next) => {
  const newEnrollement = new Enrollement(req.body);

  try {
    const savedEnrollement = await newEnrollement.save();
    res.status(200).json(savedEnrollement);
  } catch (err) {
    next(err);
  }
};
export const updateEnrollement = async (req, res, next) => {
  try {
    const updatedEnrollement = await Enrollement.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEnrollement);
  } catch (err) {
    next(err);
  }
};
export const deleteEnrollement = async (req, res, next) => {
  try {
    await Enrollement.findByIdAndDelete(req.params.id);
    res.status(200).json("Module Enrollement has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getEnrollement = async (req, res, next) => {
  try {
    const enrollement = await Enrollement.findById(req.params.id);
    res.status(200).json(enrollement);
  } catch (err) {
    next(err);
  }
};
export const getEnrollements = async (req, res, next) => {
  try {
    const enrollement = await Enrollement.find();
    res.status(200).json(enrollement);
  } catch (err) {
    res.status(500).json(err);
  }
};
