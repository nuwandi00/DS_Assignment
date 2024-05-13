import React from "react";
import pic from "../img/background.jpg";
import { useState } from "react";
import { useEffect } from "react";

const Payment = () => {
  const itemName = "Ferrero Rocher";
  const itemPrice = 800;
  const [quantity, setQuantity] = useState(1);
  const [finalAmount, setFinalAmount] = useState(itemPrice);

  useEffect(() => {
    localStorage.setItem("username", "Kamal");
    localStorage.setItem("paidCourse", "IT1250");
  }, []);

  const increment = () => {
    setQuantity(quantity + 1);
    setFinalAmount(finalAmount + itemPrice);
  };

  const decrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
      setFinalAmount(itemPrice);
    }
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setFinalAmount(finalAmount - itemPrice);
    }
  };
  const checkout = () => {
    fetch("http://localhost:8003/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer sk_test_51P9AbBCYsAvQyhDS6tx3mlPgp0fYJshoewE1iBeXDUEp8Ku03COai9iP1KpJ5GdSwui3RAD7i35T5IxASnG52OER00Uct9o5ei",
      },
      mode: "cors",
      body: JSON.stringify({
        items: [
          {
            id: 1,
            quantity: quantity,
            price: itemPrice,
            name: itemName,
          },
          {
            id: 2,
            quantity: 1,
            price: 500,
            name: "Test Item",
          },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        console.log("------here you have the data to pass to success");
        console.log(url);

        window.location = url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  return (
    <div className="w-full mx-auto">
      <div className="w-full max-w-5xl mx-auto my-6 text-center font-raleway">
        <div className="my-10 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-800">
          My Cart
        </div>
        <div
          className="flex flex-col lg:flex-row justify-center items-center
        mx-auto w-full my-16 border-2 bg-[#fcf6f6] border-slate-100 shadow-md py-4"
        >
          <div className="flex items-center justify-center w-full mx-auto my-24 lg:justify-end lg:w-6/12">
            <img src={pic} alt="" />
          </div>
          <div className="flex flex-col w-full py-8 lg:w-6/12">
            <div className="text-4xl font-bold text-yellow-700">{itemName}</div>
            <div className="my-6 text-3xl font-semibold text-slate-600">
              price:&nbsp;&nbsp;₹{itemPrice}
            </div>

            <small className="mt-10 mb-3 font-semibold">Add Quantity</small>
            <div className="flex items-center justify-center mb-10 text-slate-900">
              <span
                onClick={decrement}
                className="w-auto px-4 py-2 text-5xl bg-red-100 cursor-pointer select-none"
              >
                -
              </span>
              <span className="w-auto px-4 py-2 text-3xl font-semibold">
                {quantity}
              </span>
              <span
                onClick={increment}
                className="w-auto px-4 py-2 text-5xl bg-green-100 cursor-pointer select-none"
              >
                +
              </span>
            </div>

            <div className="my-6 text-xl">
              Amount to be paid:
              <span className="pl-3 text-3xl font-bold text-green-500">
                ₹{finalAmount}
              </span>
            </div>
            <div className="my-6">
              <button
                onClick={checkout}
                className="px-8 py-4 text-2xl font-semibold text-white bg-green-400 rounded-md"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
