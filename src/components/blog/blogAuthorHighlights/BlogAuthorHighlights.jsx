
import React, { useContext, useEffect } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import BlogInteraction from '../interaction/BlogInteraction';
import myContext from '../../../context/data/myContext';

const BlogAuthorHighlights = ({ userId, blog, blogId, commentsCount, department }) => {

  const context = useContext(myContext);
  const { mode, followAuthor, isFollowingAuthor } = context;

  const isDarkTheme = (mode == "dark");

  const { authorId, author, claps, minutesRead, date } = blog;

  // function for allowing users to follow author
  const followUser = async () => {
    // followerId, followingId, followingUsername  
    await followAuthor(userId, authorId, author);
  }

  useEffect(()=>{
    const checkIfFollowing = async () =>{
      await isFollowingAuthor(userId, authorId);
    }

    checkIfFollowing();
  },[])

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
          <div className='flex flex-row items-center space-x-4'>
            <h2>{author}</h2>
            <div className='text-xs'>•</div> {/* Centered Dot */}
            <button disabled={userId === null || isFollowingAuthor} className={`text-md ${isFollowingAuthor ? 'text-slate-300' : 'text-white'}`}
            onClick={followUser}> {isFollowingAuthor ? 'Following' : 'Follow'}</button>

          </div>

          {/* blog details */}
          <div className='flex flex-row items-center space-x-1 md:space-x-3
           mt-6 md:mt-1 justify-start'>

            <h2 className='text-right font-medium text-sm hidden sm:block'>Published in <span> {department?.toUpperCase()} </span></h2>
            <div className='text-xs hidden sm:block'>•</div> {/* Centered Dot */}
            <h2 className='ml-8 text-sm text-left'>{minutesRead} min Read</h2>
            <div className='text-xs'>•</div> {/* Centered Dot */}
            <h2 className='text-right text-sm'>{date}</h2>
          </div>
        </div>

      </div>


      {/* claps and comments count */}

      < div className={`my-10 md:ml-[0.9rem] border-2 border-l-0 py-2
      border-r-0 ${isDarkTheme ? 'border-gray-900' : 'border-gray-100'}`}>
        <BlogInteraction blogId={blogId} claps={claps} commentsCount={commentsCount}
          userId={userId} blog={blog} />


      </div>

    </div>

  )
}

export default BlogAuthorHighlights