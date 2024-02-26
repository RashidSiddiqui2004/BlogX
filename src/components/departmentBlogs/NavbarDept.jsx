
import React, { useContext } from 'react'
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';
import { FaPenToSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import myContext from '../../context/data/myContext';
import { useUser } from '../../hooks/useUser';
import deptMap from '../../utilities/departments/DepartmentMap';

const NavbarDept = ({ department }) => {

  const context = useContext(myContext);
  const { mode } = context;

  const [ham, setham] = useState(false);

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const { userId, isAuthor } = useUser();
  
  const toggleHam = () => {
    setham(!ham);
  };

  const departmentName = deptMap.get(department).toUpperCase();

  const Ham_menu = () => {
    return (<div className={`flex-col md:hidden w-[70%]
         z-10 ${mode === "light" ? "bg-white" : "bg-[#2A2C38]"} h-[100%] shadow-2xl`}>
      <div className="mx-6 w-[70%] flex items-center
        justify-start font-extrabold text-[30px]  mt-4 "
        onClick={toggleHam}>
        <IoMdClose />
      </div>


      {
        isAuthor &&
        <Link to={'/add-blog'} className='md:flex md:gap-x-2'>
          <div className="my-4 mx-6 text-[14px] flex items-center
        justify-start border-b-2 border-gray-600 py-4 w-[70%]">
            <FaPenToSquare className='mr-[6px]' />
            Write Blog
          </div>
        </Link>
      }

      <div className="my-4 mx-6 text-[14px] flex items-center justify-start 
        border-b-2 border-gray-600 py-4 w-[70%]">
        Contact Us
      </div>

      {(userId === null || userId === -1)
        ?
        <div className="my-4 mx-6 text-[14px] flex items-center justify-start 
                border-b-2 border-gray-600 py-4 w-[70%]">
          <Link to={'/signup'}>
            Register
          </Link>
        </div>
        :
        <></>}

    </div>
    );
  }

  return (
    <div className={`w-full mx-auto flex justify-between pt-6 pb-3 md:px-16 z-10 border-${mode === "light" ? "black" : "white"} text-${mode === "light" ? "black" : "white"} border-b-2`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>

      <div className="text-[14px] px-4 flex md:hidden items-center" onClick={toggleHam}>
        <RxHamburgerMenu />
      </div>

      {ham && <Ham_menu />}

      <div className={`font-semibold text-3xl mr-[40%] md:mr-0
        justify-center cursor-pointer`} onClick={handleHome}>
        Blog
        <span className="text-[#0096FF]">
          X
        </span>
      </div>


      <h1 className='text-2xl text-slate-100 font-bold text-center mb-3 md:text-3xl 
      hidden md:flex tracking-wide'>{departmentName}</h1>
 

      <div className={`mx-4 text-[16px] hidden md:flex items-center py-2 px-4`}>
        <button disabled={true}> Contact Us</button>
      </div>

    </div>

  );
}

export default NavbarDept