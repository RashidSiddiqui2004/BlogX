
import React, { useContext } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import BlogInteraction from '../interaction/BlogInteraction';
import myContext from '../../../context/data/myContext';


const BlogAuthorHighlights = ({ authorID, claps, commentsCount, blogUrl, minutesRead, publishDate }) => {

  const context = useContext(myContext);
  const { mode } = context;
  
  return (
    <div>

      <div className='flex flex-row'>

        {/* author image */}
        <div className='mx-4 my-3'>
          <FaCircleUser className='text-3xl rounded-xl' />
        </div>

        {/* blog details */}
        <div className='text-sm md:text-lg'>
          {/* author details */}
          <div className='flex flex-row items-center space-x-4'>
            <h2>Punit Chawla</h2>
            <div className=''>•</div> {/* Centered Dot */}
            <h2 className='text-green-400'>Follow</h2>
          </div>
          {/* blog details */}
          <div className='flex flex-row items-center space-x-1 md:space-x-4
           mt-4 md:mt-0'>
            {/* <h2 className=''>UI/UX Department</h2>
            <div className=''>•</div>  */}
            <h2 className='w-[100px]'>{minutesRead} min Read</h2>
            <div className=''>•</div> {/* Centered Dot */}
            <h2 className='w-[100px]'>Jan 04, 2024</h2>
          </div>
        </div>

      </div>

      {/* claps and comments count */}
      <BlogInteraction claps={claps} commentsCount={commentsCount} blogUrl={blogUrl} />

    </div>
  )
}

export default BlogAuthorHighlights