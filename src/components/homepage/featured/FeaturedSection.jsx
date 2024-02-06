import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../../context/data/myContext";
import ImageBig from './blogimage.svg';

function FeaturedSection() {
  const context = useContext(myContext);
  const { mode, getAllBlogs } = context;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      await getAllBlogs();
    }
    fetchAllBlogs();
  }, []);

  const dummyBlogs = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima temporibus, molestiae voluptates eveniet iste placeat incidunt cum veniam consectetur repellendus!",
      image: ImageBig
    },
    {
      id: 2,
      title: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos dolore harum enim eveniet, obcaecati incidunt. Expedita commodi sint, dolores unde sequi magnam animi at eaque!",
      image: ImageBig
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === dummyBlogs.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(intervalId);
  }, [dummyBlogs.length]);

  const handleSeeMoreClick = () => {
    navigate("/blog"); 
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === dummyBlogs.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? dummyBlogs.length - 1 : prevIndex - 1));
  };

  return (
    <div className="mt-[5%]">
      <div className="md:w-[6%] md:mt-10">
        <button className="prev mr-3" onClick={handlePrev}>←</button>
        <button className="next" onClick={handleNext}>→</button>
      </div>
      <div className="flex flex-col-reverse md:flex-row py-12">
        <div className="flex gap-5 justify-between mt-8 w-full max-md:flex-wrap max-md:max-w-full ">
          <div
            className={`flex text-start flex-col px-5 font-semibold max-md:max-w-full ${
              mode === "dark"
                ? "bg- rounded-lg text-white"
                : "bg-neutral-80 text-zinc-800"
            }`}
          >
            <div className="text-sm text-sky-500 uppercase max-md:max-w-full">
              Featured Blogs
            </div>
            <div className="mt-2 text-5xl text-start space-around tracking-tight leading-12 max-md:max-w-full max-md:text-4xl max-md:leading-10 ">
              {dummyBlogs[currentIndex].title}
            </div>
            <div className="text-xl text-start mt-7 space-around tracking-tight leading-12 md:max-w-full md:text-xl max-md:leading-10 font-light text-gray-400">
              {dummyBlogs[currentIndex].description}
            </div>
            <div
              className={`justify-center self-start ml-7 px-6 py-2 mt-5 text-base whitespace-nowrap border rounded-lg border-solid ${
                mode === "dark"
                  ? "bg-customBlue rounded-lg text-white border-neutral-50"
                  : "bg-neutral-80 text-zinc-800"
              } border-opacity-40 max-md:px-10 max-md:mt-10`}
              style={{ transform: "translateX(-30px)" }}
            >
              <button onClick={handleSeeMoreClick}>See More</button>
            </div>
          </div>
        </div>
        <div className="md:w-[120%] md:ml-5 flex justify-center items-center transition-transform duration-500 ease-in-out">
          <img src={dummyBlogs[currentIndex].image} alt="" className="max-w-full max-h-full" />
        </div>
      </div>
      <div className="border-b border-gray-300 mt-0 md:mt-24"></div>
    </div>
  );
}

export default FeaturedSection;
