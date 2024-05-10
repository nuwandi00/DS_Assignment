import Enrollement from "../models/EnrollementModel.js";
import Paid from "../models/PaidModel.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import nodemailer from "nodemailer";

const fetchUsers = async () => {
  const users = await fetch('http://localhost:8000/api/auth/users');
  console.log(users);
}

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
export const getEnrollementsSubsequentLogin = async (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT);
    const { username } = decoded;
    const { code } = req.body;
    const enrollement = await Enrollement.findOne({
      code: code,
      students: username,
    });
    if (!enrollement) {
      //kalin enroll wela naththm enroll wenna
      try {
        const paiduser = await Paid.findOne({ code: code, students: username });
        if (!paiduser) {
          return next(createError(401, "Unauthorized: User is not paid"));
        }

        await Enrollement.findOneAndUpdate(
          { code: code },
          { $addToSet: { students: username } },
          { upsert: true }
        );
        await sendNotifications(username);
      } catch (error) {
        return next(createError(401, "Unauthorized: step1"));
      }
    }
    // User is already logged in, display "You are logged in" message
    return res.status(200).json({ message: "You are logged in" });
  } catch (error) {
    return next(createError(401, "Unauthorized: step2"));
  }
};

/*export const sendNotifications = async (req, res,username) => {
  try {
    // Fetch user's email address
    const {userid} =req.body;
    const user = await fetch(`http://localhost:8000/api/auth/getEmail?username=${userid}`)
                    .then((response) => response.json()).then((responseJson) => {
                      console.log(responseJson);
                      return responseJson;
                    });
    // const userEmail = user.email; // Assuming the User model has an email field
    await sendEmailNotification(user, "You have enrolled");
    console.log('User Emil:', user);
    res.send(user);
    //(`http://localhost:8000/api/auth/getEmail?username=${userid}`)

    // Send email notification
     await sendEmailNotification(userEmail, "You have enrolled");

    // Send SMS notification
    // await sendSMSNotification("You have enrolled");
  } catch (err) {
    console.error("Error sending notifications:", err);
  }
};*/
export const sendNotifications = async (username) => {
  try {
    const user = await fetch(`http://localhost:8000/api/auth/getEmail?username=${username}`)
                    .then((response) => response.json());
    const userEmail = user;
    await sendEmailNotification(userEmail, "You have enrolled");
    console.log('User:', user);
    // Send SMS notification if needed
    // await sendSMSNotification("You have enrolled");
  } catch (err) {
    console.error("Error sending notifications:", err);
  }
};

const sendEmailNotification = async (userEmails, notification) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kushannalinka571@gmail.com",
        pass: "wmyy rrff wame mvmw",
      },
    });

    const mailOptions = {
      from: "kushannalinka571@gmail.com",
      to: userEmails, // Join all email addresses with comma
      subject: "New Notification",
      text: `New notification: ${notification}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};
//notification controller

const accountSid = "ACf327f0120f0e5f642d9ae22126a5b8ec";
const authToken = "a45ae863a1222dd9835427c7f859a297";
const client = twilio(accountSid, authToken);

const sendSMSNotification = async (notification) => {
  try {
    // You may adjust the phone numbers here or make it dynamic based on your application's logic
    const phoneNumbers = ["+940764846325"];

    // Send SMS notification to each phone number
    // for (const phoneNumber of phoneNumbers) {
    await client.messages.create({
      from: "+14237810889",
      to: "+94764846325",
      body: `New notification: ${notification}`,
    });
    //  }
  } catch (error) {
    console.error("Error sending SMS notification:", error);
  }
};
// Controller function for subsequent logins
export const getEnrollementsSubsequentLoginAfter = async (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT);
    const { username } = decoded;

    // Check if the user is already logged in by checking if their username is in the students array
    //const enrollement = await Enrollement.findOne({ students: username });
    // Check if the user is already logged in for a specific course by checking if their username is in the students array
    const enrollement = await Enrollement.findOne({
      code: "IT20201",
      students: username,
    });

    if (!enrollement) {
      return next(createError(401, "Unauthorized: User is not enrolled"));
      //kalin enroll wela naththm enroll wenna kiyanna
    }

    // User is already logged in, display "You are logged in" message
    return res.status(200).json({ message: "You are logged in" });
  } catch (error) {
    return next(createError(401, "Unauthorized: Invalid token"));
  }
};
export const removeStudentFromEnrollment = async (req, res, next) => {
  const { username, moduleCode } = req.body; // Assuming both username and module code are passed in the request body

  try {
    // Find the enrollment by module code
    // const enrollment = await Enrollment.findOne({ code: moduleCode });
    const enrollement = await Enrollement.findOne({ code: moduleCode });

    if (!enrollement) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    // Check if the username exists in enrollment's students array
    const studentIndex = enrollement.students.indexOf(username);
    if (studentIndex === -1) {
      return res
        .status(400)
        .json({ error: "Username not enrolled in this module" });
    }

    // Remove the username from the enrollment's students array
    enrollement.students.splice(studentIndex, 1);

    // Save the updated enrollment document
    await enrollement.save();

    res.status(200).json(enrollement);
  } catch (err) {
    next(err);
  }
};
