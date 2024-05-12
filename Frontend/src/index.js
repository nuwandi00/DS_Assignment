import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./components/Payment";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Register from "./Auth/Signup";
import Login from "./Auth/Signin";
import CreateCourse from "./components/CreateCourse";
import CourseDashboard from "./components/CourseDashboard";
import Approve from "./components/Approve";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Register />}></Route>
        <Route path="/Home" element={<App />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="create" element={<CreateCourse />} />
        <Route path="course" element={<CourseDashboard />} />
        <Route path="approve" element={<Approve />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
