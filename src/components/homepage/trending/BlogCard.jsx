
import React, { useContext } from "react";
import { GoArrowRight } from "react-icons/go";
import myContext from "../../../context/data/myContext";
import { Link } from 'react-router-dom'

const BlogCard = ({
    blogid,
    title,
    summary,
    department,
    blogPoster,
    minutesRead,
}) => {
    const context = useContext(myContext);
    const { mode } = context;

    return (
        <div

            className={`flex flex-col max-w-md mt-2 max-md:ml-0 max-md:w-full flex-grow h-full transform transition-transform hover:scale-95   ${mode === "dark"
                ? "bg-customBlue rounded-lg text-white"
                : "bg-neutral-80 text-zinc-800"
                }`}>

            <img
                src={blogPoster}
                alt={title}
                className="  rounded-lg   object-fill aspect-[1.8] "
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-base mb-4 text-left">
                    {summary}
                </p>
            </div>
            <div className="px-6 py-4 mt-auto flex justify-between w-full text-sm tracking-normal leading-4 text-sky-500 border-t border-t-zinc-800 border-t-opacity-20">
                <div className="flex gap-x-8">
                    <div className="text-sm">{department}</div>
                    <div className="text-sm">{minutesRead} min read</div>
                </div>
                <div className="flex items-center">
                    <Link
                        to={`/blog/${title}/${blogid}`}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <GoArrowRight />
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default BlogCard;

