import React from 'react';
import data from '../data.json';
import Course from './Course';

function Courses() {
  return (
    <div className="flex flex-col items-start mx-8 space-y-3 mt-14 mb-8">
      <h2 className="text-4xl font-bold">A board selection of courses</h2>
      <h3>
        Choose from 100,000 courses with new addition of publication
      </h3>
      <div className="text-xs lg:text-xl flex flex-wrap justify-start ml-1 font-bold text-gray-500 cursor-pointer">
        <h3 className="mr-4">Python</h3>
        <h3 className="mr-4">Excel</h3>
        <h3 className="mr-4">Web Development</h3>
        <h3 className="mr-4 text-black">JavaScript</h3>
        <h3 className="mr-4">Data Science</h3>
        <h3 className="mr-4">AWS Certificate</h3>
        <h3 className="mr-4">Drawing</h3>
      </div>
      <div className="text-left w-full border border-gray-300 p-7">
        <h2 className="text-2xl font-bold mb-2">Expand Your career opportunities with the Universe Code
        </h2>
        <h3>
          Below you can see some of my projects,Alredy on my YouTube Chanel,and also what i'm preparing guys.Subscribe to the chanel and click the like button ,thanks for the support.
        </h3>
        <button className="border border-black font-bold text-sm p-2 mt-4 mb-8">Universe Code</button>
        <div className="flex ga-4 flex-wrap lg:flex-none">
          {data.map((item) => (
            <div className="h-60 w-60" key={item.id}>
              <Course item={item}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
