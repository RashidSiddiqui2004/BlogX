
import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext'
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import blog_x from "./blogx_icon.svg";
import blog_xd from "./blogx_icond.svg";
import { useState } from 'react';
import { FaPenToSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"; 
import { useUser } from '../../../hooks/useUser';
import Modal from '../../../utilities/modal/Modal';


const Navbar = () => {

    const context = useContext(myContext);
    const { mode, toggleMode } = context;

    const [ham, setham] = useState(false);

    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/");
    };

    const { userId, isAuthor } = useUser();

    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const toggleLogoutModal = () => { 
        setLogoutModalOpen((prev) => !prev);
    };

    const logout = () => {
        localStorage.clear('user');
        window.location.href = '/login'
    }

    const toggleHam = () => {
        setham(!ham);
    };

    const Ham_menu = () => {
        return (<div className={`flex-col fixed md:hidden w-[70%] left-0 top-0
         z-10 ${mode === "light" ? "bg-white" : "bg-[#2A2C38]"} h-[100%] shadow-2xl`}>
            <div className="mx-6 w-[70%] flex items-center
        justify-start font-extrabold text-[30px]  mt-4 "
                onClick={toggleHam}>
                <IoMdClose />
            </div>

            <Link to={'/featured-blogs'} className='md:flex md:gap-x-2'>
                <div className="my-4 mx-6 text-[14px] flex items-center
        justify-start border-b-2 border-gray-600 py-4 w-[70%]">
                    Featured
                </div>
            </Link>



            <Link to={'/departments'} className='md:flex md:gap-x-2'>
                <div className="my-4 mx-6 text-[14px] flex items-center justify-start 
        border-b-2 border-gray-600 py-4 w-[70%]">
                    Categories
                </div>
            </Link>

            <Link to={'/trending-blogs'} className='md:flex md:gap-x-2'>
                <div className="my-4 mx-6 text-[14px] flex items-center
        justify-start border-b-2 border-gray-600 py-4 w-[70%]">
                    Trending
                </div>
            </Link>

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

            {/* <div className="my-4 mx-6 text-[14px] flex items-center justify-start
        w-[70%] py-4">
                About Us
            </div> */}

        </div>
        );
    }

    return (
        <div className={`w-[100%] mx-auto flex py-4 
        border-${(mode === "light") ? "black" : "white"} text-${mode === "light" ? "black" : "white"} border-b-2`}
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}>

            <div className="mx-4 text-[14px] flex md:hidden items-center"
                onClick={toggleHam}>
                <RxHamburgerMenu />
            </div>

            {ham && <Ham_menu />}

            {/* <Link to={'/featured-blogs'} className='md:flex md:gap-x-2'>
                <div className="mx-4 text-[14px] hidden md:flex items-center">
                    Featured
                </div>
            </Link>


            <Link to={'/departments'} className='md:flex md:gap-x-2'>
                <div className="mx-4 text-[14px] hidden md:flex items-center">
                    Categories
                </div>
            </Link> */}

            <Link to={'/trending-blogs'} className='md:flex md:gap-x-2'>
                <div className="md:mx-20 text-[14px] hidden md:flex items-center">
                    Trending
                </div>
            </Link>




            <div className={`font-semibold text-[20px] flex-1 flex items-center 
                justify-center ${isAuthor ? 'md:ml-40' : 'md:ml-20'} cursor-pointer`} onClick={handleHome}>
                Blog
                <span className="text-[#0096FF]">
                    X
                </span>
            </div>

            {
                (isAuthor)
                    ?
                    <div className="mx-4 text-[14px] hidden md:flex items-center">
                        <Link to={'/add-blog'} className='md:flex md:gap-x-2'>
                            <FaPenToSquare className='mt-[2px]' />
                            Write Blog
                        </Link>
                    </div>
                    :
                    ''
            }


            {/* {!(userId === null && userId === -1)
                ?
                <div className={`mx-4 text-[14px] hidden md:flex items-center border-
                ${(mode === "light" ? "[#333333]" : "white")} rounded-md border-2 py-2 px-4`}>
                    <Link to={'/contact-us'}>
                        Contact Us
                    </Link>
                </div>
                :
                <></>} */}

            {(userId === null || userId === -1)
                ?
                <div className={`mx-4 text-[14px] hidden md:flex items-center border-
                ${(mode === "light" ? "[#333333]" : "white")} rounded-md border-2 py-2 px-4 cursor-pointer hover:scale-95 transition-all`}>
                    <Link to={'/signup'}>
                        Register
                    </Link>
                </div>
                :
                <></>}

            {!(userId === null)
                ?
                <div className={`mx-4 text-[14px] hidden md:flex items-center cursor-pointer hover:scale-95 transition-all`}
                    onClick={toggleLogoutModal}>
                    Logout
                </div>
                :
                <></>}

            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() =>  {toggleLogoutModal();}}  
                title="Are you really sure you want to logout"
                onConfirm={() => logout()}
            />

            {/* border-${(mode === "light" ? "[#333333]" : "white")} rounded-md border-2  */}

            <div className={`mx-4 text-[14px] hidden md:flex items-center
                py-2 px-4`}>
                <button disabled={true}> About Us</button>
            </div>

            <div className="mx-4 text-[14px] flex items-center cursor-pointer">
                {mode === "light"
                    ?
                    <img src={blog_x} onClick={() => {
                        toggleMode("dark")
                        document.querySelector("body").style.backgroundColor = "#2A2C38"
                    }} />
                    :
                    <img src={blog_xd} onClick={() => {
                        toggleMode("light")
                        document.querySelector("body").style.backgroundColor = "white"
                    }} />}
            </div>
        </div>
    );
}

export default Navbar