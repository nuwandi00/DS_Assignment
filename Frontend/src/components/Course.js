import React from "react";
import img1 from "../img/background.jpg";
import { useNavigate } from "react-router-dom";

function Course({ course }) {
  const navigate = useNavigate();

  const addToCart = () => {
    navigate("/payment", {
      state: { courseName: course.name, courseFee: course.courseFee },
    });
  };

  return (
    <div
      className="w-64 m-2 space-y-3 cursor-pointer bg-slate-100"
      onClick={addToCart}
    >
      <img src={img1} alt="" className="w-full h-32" />
      <h2 className="pt-1 font-bold text-center text-gray-700 uppercase text-md">
        {course.name}
      </h2>
      <h3 className="text-sm font-semibold text-center text-gray-900">
        Course Fee : ${course.courseFee}
      </h3>
      <div
        className="p-1 mt-8 mb-8 text-xs font-bold"
        onClick={addToCart}
      ></div>
    </div>
  );
}

export default Course;
