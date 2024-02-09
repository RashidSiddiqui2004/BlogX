
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';
import TagButton from '../blog/tags/TagButton';

const RecentDeptBlogs = ({
    title,
    summary,
    tags,
    blogPoster,
    minutesRead,
    author,
    publishDate,
}) => {

    const context = useContext(myContext);
    const { mode } = context;

    return (
        <div
            className={`flex flex-col mt-2 max-md:ml-0 max-md:w-full flex-grow h-full ${mode === "dark"
                ? "bg-customBlue rounded-lg text-white"
                : "bg-neutral-80 text-zinc-800"
                }`}>

            <img
                src={blogPoster}
                alt={title}
                className="w-full h-56 object-cover"
            />

            <div className="px-6 py-4 mt-auto flex justify-evenly w-full text-sm tracking-normal leading-4 text-sky-500 border-t  border-t-zinc-800 border-t-opacity-20">
                <div className="flex justify-between gap-x-4 items-center">
                    <div className="text-sm">{author}</div>
                    <div className="text-sm ml-6">{minutesRead} min read</div>
                    <div className="text-sm ml-6">{publishDate} </div>
                </div>
                {/* <div className="flex justify-end mt-4">
                    <Link
                        to={`/blog/${title}/${blogid}`}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <GoArrowRight className="-mt-3" />
                    </Link>
                </div> */}
            </div>

            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-base mb-4 text-left">
                    {summary}
                </p>
            </div>


            <div className="px-6 py-4 mt-auto flex justify-start w-full text-sm 
            tracking-normal leading-4 text-sky-500">
                <div className='flex flex-wrap gap-y-2 md:flex-row gap-x-4'>
                    {
                        tags?.map((tag, index) => {
                            return (
                                <div key={index}>
                                    <TagButton tagName={tag} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default RecentDeptBlogs