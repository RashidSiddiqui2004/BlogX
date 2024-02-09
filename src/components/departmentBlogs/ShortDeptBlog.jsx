import React, { useContext } from 'react';
import myContext from '../../context/data/myContext'; 
import TagButton from '../blog/tags/TagButton';

const ShortDeptBlog = ({
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
            className={`flex flex-row mt-2 max-md:ml-0 max-md:w-full ${mode === "dark"
                ? "bg-customBlue rounded-lg text-white"
                : "bg-neutral-80 text-zinc-800"
                }`}>

            <div className="flex">
                <img
                    src={blogPoster}
                    alt={title}
                    className="w-full object-cover"
                    style={{ height: '100%' }}  
                />
            </div>

            <div className="flex flex-col w-full">
                <div className="px-6 py-4 mt-auto flex justify-evenly w-full text-sm tracking-normal leading-4 text-sky-500">
                    <div className="flex justify-between gap-x-4 items-center">
                        <div className="text-sm">{author}</div> 
                        <div className="text-sm ml-6">{publishDate} </div>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <div className="font-bold text-sm mb-2">{title}</div>
                    <p className="mb-4 text-left text-sm">
                        {summary}
                    </p>
                </div>

                <div className="px-6 py-4 mt-auto flex justify-start w-full text-sm 
            tracking-normal leading-4 text-sky-500">
                    <div className='flex flex-wrap gap-y-2 md:flex-row gap-x-4'>
                        {
                            tags.slice(0,2)?.map((tag, index) => {
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
        </div>
    );
};

export default ShortDeptBlog;
