import React from 'react';
import backgroundImage from '../img/udemy.jpg';

function Main() {
  return (
    <div className="relative">
      <div className="relative w-full overflow-hidden border border-gray-100 h-96">
          <img src={backgroundImage} className="relative w-4/5 h-full mx-auto my-auto" alt='background' />
          <div className="absolute bg-white top-12 p-5 flex flex-col items-start justify-center shadow-lg h-60 w-[440px] ml-48">
            <h2 className="mb-2 text-3xl font-bold">Jump into learning for less</h2>
            <h3 className="text-base text-justify">"Discover endless learning with us. Ignite knowledge, foster growth. Expert or newcomer, find your path. With experienced instructors, interactive lessons, and supportive community, achieve your goals. Join us for a brighter future."</h3>
          </div>
      </div>
    </div>
  );
}

export default Main;
