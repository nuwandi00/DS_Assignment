import React, { useState } from "react";
import img1 from "../img/img1.jpg";
import { ClipboardCheckIcon, StarIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

function Course({ item }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const addToCart = () => {
    navigate("/payment");
  };

  return (
    <div className="flex flex-col items-start space-y-1">
      <img src={img1} alt="" className="h-32 w-full" />
      <button
        className="border border-black font-bold text-xs p-1 mt-4 mb-8"
        onClick={addToCart}
      >
        Add To Cart
      </button>

      <h2 className="font-bold text-md pt-1">{item.title}</h2>
      <h2 className="text-xs text-gray-700">{item.Username}</h2>
      <div
        className="flex space-x-1 items-center"
        onMouseEnter={() => setShowModal(true)}
        onMouseLeave={() => setShowModal(false)}
      >
        <h3 className="text-orange-800 font-bold text-sm">{item.Vote}</h3>
        <div className="flex items-center">
          <StarIcon className="w-4 text-orange-400" />
          <StarIcon className="w-4 text-orange-400" />
          <StarIcon className="w-4 text-orange-400" />
          <StarIcon className="w-4 text-orange-400" />
          <StarIcon className="w-4 text-orange-400" />
        </div>
        <h3 className="text-xs">{item.students}</h3>
      </div>
      <div className="flex space-x-4 items-center">
        <h3 className="text-black font-bold">{item.price}</h3>
        <h3 className="text-gray-800 text-sm line-through">{item.oldPrice}</h3>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <div className="flex space-x-1 items-center">
                      <h3 className="text-orange-800 font-bold text-sm">
                        {item.Vote}
                      </h3>
                      <div className="flex items-center">
                        <StarIcon className="w-4 text-orange-400" />
                        <StarIcon className="w-4 text-orange-400" />
                        <StarIcon className="w-4 text-orange-400" />
                        <StarIcon className="w-4 text-orange-400" />
                        <StarIcon className="w-4 text-orange-400" />
                      </div>
                      <h3 className="text-xs">{item.students}</h3>
                    </div>
                    <div className="flex space-x-4 items-center">
                      <h3 className="text-black font-bold">{item.price}</h3>
                      <h3 className="text-gray-800 text-sm line-through">
                        {item.oldPrice}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Course;
