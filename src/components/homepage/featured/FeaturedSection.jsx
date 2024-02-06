import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../../context/data/myContext";
import RenderHTMLContent from '../../../utilities/htmlRenderer/RenderHTMLContent'
import { Link } from 'react-router-dom'

function FeaturedSection() {
  const context = useContext(myContext);
  const { mode, getFeaturedBlogs } = context;
  const navigate = useNavigate();

  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const numFeaturedBlogs = featuredBlogs.length;

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      await getFeaturedBlogs().then((featur_blogs) => {
        setFeaturedBlogs(featur_blogs)
      });
    }
    fetchFeaturedBlogs();
  }, []);


  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % numFeaturedBlogs);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [numFeaturedBlogs]);


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === numFeaturedBlogs - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? numFeaturedBlogs - 1 : prevIndex - 1));
  };

  return (
    <div className="mt-[5%]">
      <div className="md:w-[6%] md:mt-10">
        <button className={`prev mr-3  ${mode === "dark"
          ? "bg- rounded-lg text-white"
          : "bg-neutral-80 text-zinc-800"
          }`} onClick={handlePrev}>←</button>
        <button className={`next mr-3  ${mode === "dark"
          ? "bg- rounded-lg text-white"
          : "bg-neutral-80 text-zinc-800"
          }`} onClick={handleNext}>→</button>
      </div>
      <div className="flex flex-col-reverse md:flex-row py-12">
        <div className="flex gap-5 justify-between mt-8 w-full max-md:flex-wrap max-md:max-w-full ">
          <div
            className={`flex text-start flex-col px-5 font-semibold max-md:max-w-full ${mode === "dark"
              ? "bg- rounded-lg text-white"
              : "bg-neutral-80 text-zinc-800"
              }`}
          >
            <div className="flex flex-row gap-x-5">
              <div className="text-sm text-sky-500 uppercase max-md:max-w-full">
                Featured Blogs
              </div>
              <div className="text-sm text-white bg-slate-700 px-3 py-1 rounded-sm">
                {featuredBlogs[currentIndex]?.department}
                {/* Machine Learning */}
              </div>
            </div>

            <div className="mt-2 text-3xl text-start space-around tracking-tight leading-12 max-md:max-w-full max-md:text-4xl max-md:leading-10 ">
              {featuredBlogs[currentIndex]?.title}
            </div>
            <div className="text-lg text-start mt-7 space-around tracking-tight leading-12 md:max-w-full md:text-xl max-md:leading-10 font-light text-gray-400">
              {featuredBlogs[currentIndex]?.summary && <RenderHTMLContent htmlContent={featuredBlogs[currentIndex]?.summary} />}
            </div>
            <div
              className={`justify-center self-start ml-7 px-6 py-2 mt-5 text-base whitespace-nowrap border rounded-lg border-solid ${mode === "dark"
                ? "bg-customBlue rounded-lg text-white border-neutral-50"
                : "bg-neutral-80 text-zinc-800"
                } border-opacity-40 max-md:px-10 max-md:mt-10`}
              style={{ transform: "translateX(-30px)" }}
            >
              <Link to={`/blog/${featuredBlogs[currentIndex]?.id}`}>
                <button>See More</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-[100%] md:ml-5 flex justify-center items-center transition-transform duration-500 ease-in-out">
          <img src={featuredBlogs[currentIndex]?.blogPoster} alt="" className="max-w-full max-h-full" />
        </div>
      </div>
      <div className="border-b border-gray-300 mt-0 md:mt-24"></div>
    </div>
  );
}

export default FeaturedSection;
