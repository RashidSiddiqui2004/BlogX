import React from "react";
import { GoArrowRight } from "react-icons/go";




// this  is  only for the   skeleton purpose
const BlogCard = () => (
    <div className=" flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
    <div className="flex flex-col grow p-2 w-full bg-neutral-80 rounded-lg   max-md:mt-4 transform transition-transform hover:scale-105">
        <img
            src="https://res.cloudinary.com/dk8y96rpu/image/upload/v1703790717/img1_fnim8m.jpg"
            className="w-full aspect-[1.61] rounded-lg fill-zinc-800"
        />
        <div className="flex flex-col bg-neutral-50 rounded-lg  px-2 pt-2 mt-2">
            <div className="text-2xl tracking-tight leading-6 text-zinc-800">
                Grand Blog for Nerds
            </div>
            <div className="mt-4 text-base font-light tracking-normal leading-6 text-zinc-800 text-opacity-80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris.
            </div>
            <div className="flex gap-5 justify-between py-3 mt-4 w-full text-sm tracking-normal leading-4 text-sky-500 border-t  border-t-zinc-800 border-t-opacity-20">
                <div className="flex gap-3 justify-between">
                    <div>WebDev</div>
                    <div className="flex-auto">5min read</div>
                </div>
                <GoArrowRight />
                
            </div>
        </div>
    </div>
</div>

);
function TrendingBlogs() {
  return (
    <div className="flex flex-col py-12">
      <div className="flex gap-5 justify-between mt-8 w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex text-start flex-col px-5 font-semibold max-md:max-w-full">
          <div className="text-sm text-sky-500 uppercase max-md:max-w-full">
            Trending Topics
          </div>
          <div className="mt-2 text-5xl text-start  space-around tracking-tight leading-12 text-zinc-800 max-md:max-w-full max-md:text-4xl max-md:leading-10">
            Stay Updated with Our <br /> Latest Insights
          </div>
        </div>
       
      </div>
      <div className="justify-center self-end px-6 py-2 mt-5 text-base whitespace-nowrap rounded border border-solid border-zinc-800 border-opacity-40 text-zinc-800 max-md:px-10 max-md:mt-10">
          See More
        </div>

      {/* first row */}
      <div className="px-5 mt-10 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>

      {/* second row */}
      <div className="px-5 mt-8 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>

    </div>
  );
}

export default TrendingBlogs;
