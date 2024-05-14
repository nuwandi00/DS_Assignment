import React from "react";
import success from "../img/success.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Success = () => {
  const courseName = localStorage.getItem("courseName");
  const courseFee = localStorage.getItem("courseFee");
  useEffect(() => {
    // console.log(username, paidCourse);

    fetch("http://localhost:8003/api/paid/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        username: courseName,
        code: courseFee,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .catch((e) => {
        console.log(e.error);
        console.log(e);
      });
  }, []);

  return (
    <div
      className="grid place-items-center w-full lg:h-screen h-full
     font-raleway bg-[#F7F7F7]"
    >
      <div className="max-w-5xl rounded flex flex-col">
        <span className="text-green-600 text-5xl">
          Payment successfully done for <br></br>
          {courseName}
        </span>
        <span className="text-yellow-600 text-center mt-8 text-2xl font-bold">
          Your order is in our system
        </span>
        <div className="flex justify-end items-center mx-auto my-24 w-60">
          <img src={success} alt="" />
        </div>
        <div className="my-10 mx-auto">
          <Link to="/" className="underline text-xl underline-offset-4">
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
