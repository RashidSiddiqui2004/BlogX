
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';
import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import TagSection from '../blog/tags/TagSection';

const RecentDeptBlogs = ({
    title,
    summary,
    blogid,
    tags,
    blogPoster,
    // minutesRead,
    // author,
    publishDate,
    encodedTitle,
}) => {

    const context = useContext(myContext);
    const { mode } = context;

    return (
        <div
            className={`flex flex-col mt-2 max-md:ml-0 max-md:w-full flex-grow md:h-full ${mode === "dark"
                ? "rounded-lg text-white"
                : "bg-neutral-80 text-zinc-800"
                }`}>


            <Link to={`/blog/${encodedTitle}/${blogid}`}  >
                <img
                    src={blogPoster}
                    alt={title}
                    className="w-full h-64 object-cover rounded-sm"
                />
            </Link>


            <div className="mt-8 w-full text-sm tracking-normal leading-4 text-sky-500">
                <div className="">
                    {/* <div className="text-xs md:text-sm">{author}</div> */}
                    {/* <div className="text-xs md:text-sm ml-3 md:ml-6">{minutesRead} min read</div> */}
                    <div className="text-xs md:text-sm ml-2 md:ml-4 text-left font-bold">{publishDate}</div>
                </div>
            </div>

            <div className="px-2 py-4">

                <div className='flex justify-between items-center'>
                    <Link
                        to={`/blog/${encodedTitle}/${blogid}`}
                    >
                        <div className="font-bold text-lg md:text-xl mb-3 text-left">{title}</div>
                    </Link>

                    <div className="flex items-center">
                        <Link
                            to={`/blog/${encodedTitle}/${blogid}`}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <GoArrowUpRight className='font-semibold text-2xl text-white' />
                        </Link>
                    </div>
                </div>


                <p className="text-base mb-2 text-justify">
                    {summary}
                </p>
            </div>


            <div className="px-6 mb-2 mt-auto flex justify-start w-full text-sm 
            tracking-normal leading-4 text-sky-500">
                <TagSection tagList={tags} />
            </div>
        </div>
    );
};

export default RecentDeptBlogs