Learning Management System (LMS)
Introduction
This repository contains the codebase for a Learning Management System (LMS) developed using the MERN stack and microservice architecture. 
The system allows learners to browse, enroll in, and access courses, while providing course management functionalities for instructors and administrators.

Core Features
Web Interface:
Developed a user-friendly interface accessible across various devices.
Course Management Service:
Instructor Role:
Add, update, and delete course content (lecture notes, videos, quizzes).
Monitor learner progress.
Admin Role:
Approve course content.
Integrate payment gateways.
Handle financial transactions related to course enrollments.
Learner Service:
Enroll in courses.
Track course progress.
Cancel course enrollment if needed.
Multiple Course Enrollment:
Learners can enroll in multiple courses simultaneously without scheduling conflicts.
Payment Integration:
Integrated payment gateways for course enrollment payments (e.g., Payhere, sandbox environment).
Confirmation and Notification:
Upon successful enrollment, learners receive confirmation via SMS and email.
<hr/>
Setup Instructions
<br/>
Clone Repository:

bash
Copy code
git clone https://github.com/nuwandi00/DS_Assignment.git
<br/>
Install Dependencies:
<br/>

cd Gateway npm install <br/>
cd Enrollment-Progress npm install <br/>
cd Payment npm install <br/>
cd User-Course npm install <br/>
cd Frontend  npm install <br/>
Environment Configuration:
<br/>
Create .env files for each microservice (e.g., User-Course/.env, Enrollment-Progress/.env) based on provided .env.example files.
<br/>
Database Setup:
<br/>
Configure database connections in .env files.
<br/>

Run Services:

<br/>
cd User-Course
npm start
<br/>
cd Enrollment-Progress
npm start
<br/>
cd Payment
npm start
<br/>
cd Gateway
npm start
<br/>
cd Frontend
npm start

Perform testing for each service to ensure functionalities work as expected.
<br/>
Technologies Used
<br/>
Frontend:
ReactJS,
Redux,
HTML/CSS,
Tailwind css
<br/>
Backend:
Node.js,
Express.js,
<br/>
MongoDB
<br/>
Microservices:
Docker,
Kubernetes
<br/>
Payment Integration:
Stripe
<br/>
Notification Services:
Third-party SMS and email services
<br/>
Twilio,Nodemailer
<br/>
Contributors
Nuwandi - https://github.com/nuwandi00
<br/>
 Kushan - https://github.com/KushanNalinka
<br/>
Rishen - https://github.com/Rishen-Lithan

