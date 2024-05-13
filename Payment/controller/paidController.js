import Enrollement from "../model/paidModel.js";

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

// export const paidUsers = async (req, res) => {
//   const username = req.query.username;
//   const code = req.query.code;

//   if (!username) {
//     return res.status(400).json({ message: "Enter the Username" });
//   }

//   try {
//     const user = await Paid.findOne({ username: username }, { code: code });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.log("Error retrieving user Modules : ", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const paidUsers = async (req, res) => {
  console.log("hello yasas");
  const username = req.query.username;
  const code = req.query.code;

  if (!username) {
    return res.status(400).json({ message: "Enter the Username" });
  }

  try {
    const user = await Enrollement.findOne({ username: username, code: code });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log("Error retrieving user Modules : ", error);
    res
      .status(500)
      .json({ message: "Internal Server Error5", error: error.message });
  }
};
