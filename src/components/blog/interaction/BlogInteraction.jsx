import React from "react";
import { PiHandsClappingBold } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";
const BlogInteraction = ({ claps, commentsCount, blogUrl }) => {
  return (
    <div>
      <div className="flex flex-row mx-8 md:mx-16 mt-5 mb-4 space-x-8 md:space-x-16">
        <div className="flex flex-row space-x-3">
          <PiHandsClappingBold className="text-2xl cursor-pointer" />
          <span className="text-lg font-semibold ">{claps}</span>
        </div>
        <div className="flex flex-row space-x-3">
          <FaRegComment className="text-2xl cursor-pointer" />
          <span className="text-lg font-semibold ">{commentsCount}</span>
        </div>

        <div className="flex flex-row space-x-3 cursor-pointer">
          <MdIosShare className="text-2xl" />
          <span className="text-lg font-semibold hidden md:block">
            Share this Blog
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogInteraction;
