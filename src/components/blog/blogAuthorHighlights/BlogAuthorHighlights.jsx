
import React, { useContext } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import BlogInteraction from '../interaction/BlogInteraction';
import myContext from '../../../context/data/myContext';

const BlogAuthorHighlights = ({ userId, blog, blogId, commentsCount }) => {

  const context = useContext(myContext);
  const { mode, followAuthor } = context;

  const isDarkTheme = (mode == "dark");

  const { authorId, author, claps, minutesRead, date } = blog;

  // function for allowing users to follow author
  const followUser = async () => {
    // followerId, followingId, followingUsername  
    await followAuthor(userId, authorId, author);
  }

  return (
    <div className='cursor:default mt-2'>

      <div className='flex flex-row'>

        {/* author image */}
        <div className='mx-4 mb-3 mt-1'>
          <FaCircleUser className='text-3xl rounded-xl' />
        </div>

        {/* blog details */}
        <div className='text-sm md:text-lg'>
          {/* author details */}

          <div className='flex flex-row items-center space-x-4 justify-between'>
            <h2 className='text-lg font-extralight hover:underline cursor:default'>{author}</h2>
            <div className=''></div> {/* Centered Dot */}
            <button disabled={userId === null} onClick={followUser} />
          </div>


        </div>

        {/* blog details */}
        <div className='flex flex-row items-center space-x-1 md:space-x-4
           mt-4 md:mt-1 justify-between'>
          {/* <h2 className=''>UI/UX Department</h2>
            <div className=''>•</div>  */}
          <h2 className='w-[110px] text-sm text-left'>{minutesRead} min Read</h2>

          <div className=''></div> {/* Centered Dot */}
          <h2 className='w-[110px] text-right text-sm'>{date}</h2>
        </div>

      </div>


      {/* claps and comments count */}

      < div className={`my-10 ml-[0.9rem] border-2 border-l-0 
      border-r-0 ${isDarkTheme ? 'border-gray-800' : 'border-gray-100'}`}>
        <BlogInteraction blogId={blogId} claps={claps} commentsCount={commentsCount}
          userId={userId} blog={blog} />


      </div>

    </div>

  )
}

export default BlogAuthorHighlights