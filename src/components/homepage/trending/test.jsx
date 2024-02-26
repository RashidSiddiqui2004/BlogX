import React, { useContext } from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import myContext from "../../../context/data/myContext";

const Newblogcard = ({
  blogid,
  title,
  urlTitle,
  summary,
  department,
  blogPoster,
  minutesRead,
}) => {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <div className="flex  h-full max-md:ml-0 max-md:w-full transform transition-all hover:scale-[99%]">
      <div className="relative flex flex-row flex-grow p-5 w-full bg-black rounded-3xl border-0 border-white border-solid max-md:mt-4">
        <Link to={`/blog/${urlTitle}/${blogid}`}>
          <img
            src={blogPoster}
            alt={title}
            className=" transform transition-all  h-full hover:scale-[103%] rounded-3xl object-fill aspect-[1.8] ease-in-out shadow-orange-100"
          />
        </Link>

        <div className="flex flex-col flex-grow justify-between px-2 pt-2 mt-5">
          <Link to={`/blog/${urlTitle}/${blogid}`}>
            <div className="text-4xl font-black tracking-tight leading-9 text-stone-300">
              {title}
            </div>
          </Link>
          <div className="mt-10">
            <div className="flex justify-between items-start mt-auto w-full text-sm tracking-normal leading-4 text-sky-500">
              <div className="flex gap-4">
                <div>{department}</div>
                <div>{minutesRead} min read</div>
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
      </div>
    </div>
  );
};

export default Newblogcard;