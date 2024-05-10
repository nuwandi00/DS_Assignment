import React, { useState } from 'react';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import img4 from '../img/img4.jpg';

function Main() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [img1, img2, img3, img4];

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="relative">
      <div className="w-full h-96 border border-gray-100 relative overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`img${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover bg-no-repeate bg-bottom transition-opacity duration-100 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute bg-white top-12 left-8 p-4 flex flex-col items-start justify-center shadow-lg h-40 w-[440px]">
          <h2 className="text-3xl font-bold mb-2">Hi Guys Welcome</h2>
          <h3 className="text-xl">Look at this Project!!!</h3>
          <h3 className="text-xl font-bold mb-2">The Goal is to learn Without Stress</h3>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-4 h-4 rounded-full bg-white border border-gray-400 focus:outline-none focus:border-blue-500 ${
              index === currentImage ? 'bg-gray-400' : ''
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Main;
