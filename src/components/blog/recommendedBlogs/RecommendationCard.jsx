
import React from 'react'

const RecommendationCard = ({
    title,
    tags,
    department,
    blogPoster,
    publishDate,
    minsRead,
}) => {
    return (
        <div
            className='grid grid-cols-12 mb-6 max-md:ml-0 max-md:w-full ${mode === "dark"
                 rounded-lg text-white'>

            <div className="flex col-span-7">
                <img
                    src={blogPoster}
                    alt={title}
                    className="w-full object-cover"
                    style={{ height: '90%' }}
                />
            </div>

            <div className="flex flex-col col-span-5">
                <div className="pb-4 text-sm tracking-normal leading-4 text-sky-500">
                    <div className="flex justify-between gap-x-4 items-center">
                        <div className="text-xs font-bold ml-6">{publishDate} </div>
                    </div>
                </div>

                <h1 className='mt-[2px] bg-slate-800 rounded-md
                text-sm w-fit px-2 py-1 mx-6'>{department}</h1>


                <div className="px-4 py-2">
                    <div className="font-bold text-sm text-left">{title}</div>
                </div>


                <div className='px-4 text-sm text-left mt-4'>
                    {minsRead} min read
                </div>


                {/* <div className="px-6 mb-2 flex justify-start w-full text-sm 
    tracking-normal leading-4 text-sky-500">
                    <TagSection tagList={tags} />
                </div> */}
                
            </div>
        </div>
    )
}

export default RecommendationCard