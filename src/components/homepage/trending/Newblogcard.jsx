import React from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import "./styles.css";

const Newblogcard = ({
  blogid,
  title,
  urlTitle, 
  department,
  blogPoster,
  minutesRead,
}) => {

  return (
    <div className="blog-card shadow-[0_35px_60px_-15px_rgba(128,128,128,0.3)] flex flex-grow h-full max-md:ml-0 max-md:w-full transform transition-all hover:scale-[99%]">
      <div className="flex flex-col flex-grow p-5 w-full bg-black rounded-3xl border-0 border-white border-solid max-md:mt-4 relative">
        <Link to={`/blog/${urlTitle}/${blogid}`}>
          <img src={blogPoster} alt={title} className="w-full transform transition-all hover:scale-[103%] rounded-3xl aspect-[1.59] ease-in-out shadow-orange-100" />
        </Link>

        <div className="flex flex-col px-2 pt-2 mt-5">
          <Link to={`/blog/${urlTitle}/${blogid}`}>
            <div className="text-4xl font-black tracking-tight leading-9 text-stone-300">
              {title}
            </div>
          </Link>
        </div>
        <div className="flex-grow flex flex-col justify-end">
          <div className="flex gap-5 justify-between py-3 pr-2 mt-auto w-full text-sm tracking-normal leading-4 text-sky-500 border-0 border-white border-solid">
            <div className="flex gap-4 ">
              <div>{department}</div>
              <div className="flex-auto">{minutesRead} min read </div>
            </div>
            <Link
              to={`/blog/${urlTitle}/${blogid}`}
              className="text-blue-500 hover:text-blue-700"
            >
              <GoArrowRight />
            </Link>
          </div>
        </div>

      </div>
      <div className="pb-5"></div>
    </div>
  );
};

export default Newblogcard;
