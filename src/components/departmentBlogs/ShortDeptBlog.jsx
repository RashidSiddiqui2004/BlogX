import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';  
import TagSection from '../blog/tags/TagSection';

const ShortDeptBlog = ({
    title,
    summary,
    tags,
    blogPoster,
    // minutesRead,
    // author,
    publishDate,
}) => {

    const context = useContext(myContext);
    const { mode } = context;

    return (
        <div
            className={`grid grid-cols-12 mt-2 mb-6 max-md:ml-0 max-md:w-full ${mode === "dark"
                ? "rounded-lg text-white"
                : "text-zinc-800"
                }`}>

            <div className="flex col-span-7">
                <img
                    src={blogPoster}
                    alt={title}
                    className="w-full object-cover"
                    style={{ height: '100%' }}  
                />
            </div>

            <div className="flex flex-col w-full col-span-5">
                <div className="py-4 mt-auto  w-full text-sm tracking-normal leading-4 text-sky-500">
                    <div className="flex justify-between gap-x-4 items-center">
                        {/* <div className="text-xs">{author}</div>  */}
                        <div className="text-xs font-bold ml-6">{publishDate} </div>
                    </div>
                </div>

                <div className="px-4 py-2">
                    <div className="font-bold text-sm mb-2 text-left">{title}</div>
                    <p className="mb-4 text-left text-sm">
                        {summary}
                    </p>
                </div>

                <div className="px-6 mb-2 mt-auto flex justify-start w-full text-sm 
            tracking-normal leading-4 text-sky-500"> 
                <TagSection tagList={tags}/>
            </div>
            </div>
        </div>
    );
};

export default ShortDeptBlog;
