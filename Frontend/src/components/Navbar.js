import React from 'react';
import { GlobeAltIcon, MenuIcon, SearchIcon } from "@heroicons/react/outline";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  }

  const navigateToCourse = () => {
    navigate('/course');
  }
  const navigateToEnrollment = () => {
    navigate('/enrollment');
  }
  const navigateToEnroll = () => {
    navigate('/courseenroll');
  }
  const navigateToProgress = () => {
    navigate('/progress');
  }


  const navigateToApprovals = () => {
    navigate('/approve')
  }

  return (
    <div>
      <div className="flex space-x-4 bg-white h-[74px] shadow-lg text-center justify-between items-center px-4">
        <MenuIcon className="w-6 h-6 md:hidden"/>
        <h2 className="text-3xl font-bold cursor-pointer">EduWave</h2>
        <h3 className="hidden text-sm cursor-pointer md:block" onClick={navigateToCourse}>Courses</h3>
        <h3 className="hidden text-sm cursor-pointer md:block" onClick={navigateToEnrollment}>Enrollment</h3>
        <form className="hidden bg-[#f8fafb] md:flex border border-black rounded-3xl flex-1 h-12 item-center">
          <input 
            type="text"
            placeholder="Search for anything"
            className="text-sm outline-none bg-[#f8fafb] ml-5"/>
          <SearchIcon className="w-5 h-5 mx-auto my-auto text-gray-400 ml-[640px]"/>
        </form>
        <h3 className="hidden text-sm cursor-pointer lg:block" onClick={navigateToApprovals}>Approvals</h3>
        <h3 className="hidden text-sm cursor-pointer lg:block md:hidden"  onClick={navigateToEnroll}>Enroll</h3>
        <h3 className="hidden text-sm cursor-pointer lg:block md:hidden"  onClick={navigateToProgress}>My Learnings</h3>
        <div className="flex">
        </div>
        <div className="justify-end hidden pr-4 space-x-4 md:flex">
          <button className="w-32 h-10 text-sm font-bold text-white border border-black rounded-sm bg-slate-700" onClick={handleLogout}>
            Log Out
          </button>
          <button className="border border-black w-10 flex items-center justify-center hover:bg-[F5F5F5]">
            <GlobeAltIcon className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
