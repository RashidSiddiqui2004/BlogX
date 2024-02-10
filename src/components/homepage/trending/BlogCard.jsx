
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
           className = {`flex flex-col max-w-md mt-2 max-md:ml-0 max-md:w-full transform  transition-transform hover:scale-95 flex-grow h-full ${mode === "dark"
                 ? "bg-customBlue rounded-lg text-white"
                 : "bg-neutral-80 text-zinc-800"
                 }`}>
 
            <img
                src={blogPoster}
                alt={title}
                className="  rounded-sm   object-fill aspect-[1.8] "
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-base mb-4 text-left">
                    {summary}
                </p>
            </div>
            <div className="px-6 py-4 mt-auto flex justify-evenly w-full text-sm tracking-normal leading-4 text-sky-500 border-t  border-t-zinc-800 border-t-opacity-20">
                <div className="flex justify-between gap-x-4 items-center">
                    <div className="text-sm">{department}</div>
                    <div className="text-sm ml-6">{minutesRead} min read</div>
                </div>
                <div className="flex justify-end mt-4">
                    <Link
                        to={`/blog/${title}/${blogid}`}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <GoArrowRight className="-mt-3"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;


// const BlogCard = ({
//     blogid,
//     title, 
//     summary, 
//     department,
//     blogPoster, 
//     minutesRead, }) => {

//     const context = useContext(myContext);
//     const { mode } = context;

//     return (
//         <div
//             className={`flex flex-col max-md:ml-0 max-md:w-full flex-grow h-full ${mode === "dark"
//                 ? "bg-customBlue rounded-lg text-white"
//                 : "bg-neutral-80 text-zinc-800"
//                 }`}
//         >
//             <div className="flex flex-col shrink p-2 w-full bg-neutral-80   rounded-lg  max-md:mt-4 transform transition-transform hover:scale-95    ">
//                 <img
//                     src={blogPoster}
//                     className="w-full aspect-[1.5] rounded-md fill-zinc-800"
//                 />
//                 <div className="flex flex-col   px-2 pt-2 mt-2">
//                     <div className="text-2xl tracking-tight leading-6">
//                         {title}
//                     </div>
//                     <div className="mt-4 text-base font-light tracking-normal leading-6 flex-grow">
//                         {summary && <RenderHTMLContent htmlContent={summary} />} 
//                     </div>
                    // <div className="flex gap-5 justify-between py-3 mt-4 w-full text-sm tracking-normal leading-4 text-sky-500 border-t  border-t-zinc-800 border-t-opacity-20">
                    //     <div className="flex gap-3 justify-between">
                    //         <div>{department}</div>
                    //         <div className="flex-auto">{minutesRead}min read</div>
                    //     </div>
                    //     <Link to={`/blog/${title}/${blogid}`}>
                    //         <GoArrowRight />
                    //     </Link>

                    // </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default BlogCard