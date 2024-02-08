import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../../context/data/myContext";
import { Link } from 'react-router-dom';
import Card from './CardsCategory';

import WebDept from './WebDevelopment.png';
import AppDept from './AppDev.png';
import MLDept from './ML.png';

function CategorySection() {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();

  const departmentData = [
    {
      id: 1,
      title: "WebDev",
      image: WebDept,
      url: 'web-development'
    },
    {
      id: 2,
      title: "AppDev",
      image: AppDept,
      url: 'app-development'
    },
    {
      id: 3,
      title: "AI & ML",
      image: MLDept,
      url: 'machine-learning'
    },
  ];



  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSeeMoreClick = () => {
    navigate("/blog");
  };



  return (
    <div className="mt-[5%]">
      <div className="md:w-[6%] md:mt-10 flex justify-around">
        <button className={`prev mr-3 md:mr-0 hidden md:block ${mode === "dark"
          ? "bg- rounded-lg text-white"
          : "bg-neutral-80  text-gray-400"
          }`} >←</button>
        <button className={`next hidden md:block ${mode === "dark"
          ? "bg- rounded-lg text-white"
          : "bg-neutral-80 text-zinc-800"
          }`} >→</button>
      </div>
      <div className="flex flex-col justify-between md:flex-row md:py-12 md:h-[500px] h-[250px]">
        <div className="flex gap-5 justify-between md:mt-8 md:w-[30%] max-md:flex-wrap ">
          <div
            className={`flex text-start flex-col px-5 font-semibold max-md:max-w-full ${mode === "dark"
              ? "bg- rounded-lg text-white"
              : "bg-neutral-80 text-zinc-800"
              }`}
            style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
          >
            <div className="flex flex-row gap-x-5">
              <div className="text-sm text-sky-500 uppercase max-md:max-w-full">
                Categories
              </div>
            </div>

            <div className="mt-5 text-3xl text-start space-around tracking-tight leading-12 max-md:max-w-full max-md:leading-10 md:mb-0 mb-10 md:text-5xl">
              Dive into <br className="hidden md:block" /> Tech <span className="text-blue-400 text-normal">&#10216; / &#10217;</span>
            </div>

            <div
              className={`justify-center self-start ml-7 px-6 py-2 mt-4 hidden md:block md:mb-0 mb-10 text-base whitespace-nowrap border rounded-lg border-solid ${mode === "dark"
                ? "bg-customBlue rounded-lg text-white border-neutral-50"
                : "bg-neutral-80 text-zinc-800"
                } border-opacity-40 max-md:px-10 md:mt-10`}
              style={{ transform: "translateX(-30px)" }}
            >
              <Link to={`/blog`}>
                <button onClick={handleSeeMoreClick}>See More</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-[65%] w-[90%] mx-auto mt-20 md:ml-auto md:mr-5 flex justify-center items-center transition-transform duration-500 ease-in-out md:mb-[-3.5%]">
          <div className={`grid grid-cols-3 gap-5 justify-between md:h-[80%] h-[240%] ${mode === "dark"
            ? "bg- rounded-lg text-white"
            : "bg-neutral-80 text-gray-500"
            }`}>
            {departmentData.map((dept) => (
              // <div>
                <Link to={`/department/${dept.url}`}  
                key={dept.id}>
                  <Card
                    title={dept.title}
                    image={dept.image}
                  />
                </Link>

              // </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300 md:mt-24 mt-24"></div>
    </div>
  );
}

export default CategorySection;
