import React from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import "./styles.css";


const Newblogcard = ({
  blogid,
  title,
  urlTitle,
  // summary,
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

// import React, { useContext } from "react";
// import { GoArrowRight } from "react-icons/go";
// import { Link } from "react-router-dom";
// import myContext from "../../../context/data/myContext";

// const Newblogcard = ({
//   blogid,
//   title,
//   urlTitle,
//   summary,
//   department,
//   blogPoster,
//   minutesRead,
// }) => {
//   const context = useContext(myContext);
//   const { mode } = context;

//   return (
//     <div className="  flex-grow  flex  flex-col h-full max-md:ml-0      transform transition-all hover:scale-[99%]">
//       <div className=" flex   bg-black p-5 rounded-3xl border-0 border-white border-solid max-md:mt-4">
//         {/* <div className="">
//           <Link to={`/blog/${urlTitle}/${blogid}`} className="">
//             <img
//             //   src={blogPoster}
//               alt={title}
//               className="transform transition-all h-full  hover:scale-[103%] rounded-3xl object-cover ease-in-out shadow-orange-100"
//             />
//           </Link>
//         </div>
// c */}

//         <div className="flex  flex-row    px-3 justify-end">

//         <div className="flex flex-col flex-grow justify-between px-2 pt-2 mt-5">
//           <Link to={`/blog/${urlTitle}/${blogid}`}>
//             <div className="text-4xl font-black tracking-tight flex justify-between  leading-9 text-stone-300">
//               {title}
//             </div>
//           </Link>
//           <div className="mt-10 px-10">
//             <div className="flex justify-between items-start mt-auto w-full text-sm tracking-normal leading-4 text-sky-500">
//               <div className="flex gap-3">
//                 <div>{department}</div>
//                 <div>{minutesRead} min read</div>
//               </div>
//               <Link
//                 to={`/blog/${urlTitle}/${blogid}`}
//                 className="text-blue-500 hover:text-blue-700"
//               >
//                 <GoArrowRight />
//               </Link>
//             </div>
//           </div>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Newblogcard;
// import React, { useContext } from "react";
// import { GoArrowRight } from "react-icons/go";
// import { Link } from "react-router-dom";
// import myContext from "../../../context/data/myContext";


// const Newblogcard = ({
//   blogid,
//   title,
//   urlTitle,
//   summary,
//   department,
//   blogPoster,
//   minutesRead,
// }) => {
//   const context = useContext(myContext);
//   const { mode } = context;

//   return (
//     <div className="blog-card">
//       <div className="flex bg-black p-5 rounded-3xl border-0 border-white border-solid max-md:mt-4">
//         <Link to={`/blog/${urlTitle}/${blogid}`} className="w-100 h-60 mr-5">
//           <img
//             src={blogPoster}
//             alt={title}
//             className="w-full h-full rounded-3xl object-fill hover-scale"
//           />
//         </Link>

//         <div className="flex flex-col flex-grow justify-between">
//           <Link to={`/blog/${urlTitle}/${blogid}`}>
//             <div className="text-3xl h-full text-start font-black tracking-tight leading-9 text-stone-300 overflow-hidden md:text-3xl lg:text-3xl xl:text-5xl">
//               {title}
//             </div>
//           </Link>
//           <div className="px-10 mt-2">
//             <div className="flex justify-between items-start w-full text-sm tracking-normal leading-4 text-sky-500">
//               <div className="flex gap-3">
//                 <div>{department}</div>
//                 <div>{minutesRead} min read</div>
//               </div>
//               <Link
//                 to={`/blog/${urlTitle}/${blogid}`}
//                 className="text-blue-500 hover:text-blue-700"
//               >
//                 <GoArrowRight />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Newblogcard;



