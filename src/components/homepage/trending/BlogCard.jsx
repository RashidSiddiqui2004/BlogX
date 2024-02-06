
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import myContext from "../../../context/data/myContext";
import RenderHTMLContent from '../../../utilities/htmlRenderer/RenderHTMLContent'
import { Link } from 'react-router-dom'


const BlogCard = ({
    blogid,
    title,
    description,
    summary,
    author,
    authorId,
    department,
    blogPoster,
    tags,
    claps,
    minutesRead,
    date }) => {

    const context = useContext(myContext);
    const { mode } = context;

    return (
        <div
            className={`flex flex-col max-md:ml-0 max-md:w-full ${mode === "dark"
                ? "bg-customBlue rounded-lg text-white"
                : "bg-neutral-80 text-zinc-800"
                }`}
        >
            <div className="flex flex-col shrink p-2 w-full bg-neutral-80   rounded-lg  max-md:mt-4 transform transition-transform hover:scale-95    ">
                <img
                    src={blogPoster}
                    className="w-full aspect-[1.5] rounded-md fill-zinc-800"
                />
                <div className="flex flex-col   px-2 pt-2 mt-2">
                    <div className="text-2xl tracking-tight leading-6">
                        {title}
                    </div>
                    <div className="mt-4 text-base font-light tracking-normal leading-6 text-opacity-80">
                        {summary && <RenderHTMLContent htmlContent={summary} />}
                    </div>
                    <div className="flex gap-5 justify-between py-3 mt-4 w-full text-sm tracking-normal leading-4 text-sky-500 border-t  border-t-zinc-800 border-t-opacity-20">
                        <div className="flex gap-3 justify-between">
                            <div>{department}</div>
                            <div className="flex-auto">{minutesRead}min read</div>
                        </div>
                        <Link to={`/blog/${blogid}`}>
                            <GoArrowRight />
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};


export default BlogCard