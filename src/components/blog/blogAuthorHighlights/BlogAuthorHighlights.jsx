
import React, { useContext} from 'react'
import { FaCircleUser } from "react-icons/fa6";
import BlogInteraction from '../interaction/BlogInteraction';
import myContext from '../../../context/data/myContext'; 

const BlogAuthorHighlights = ({ userId, blogId , authorID, authorName, claps, 
  commentsCount, minutesRead, publishDate }) => {

  const context = useContext(myContext);
  const { mode, followAuthor } = context;

  // function for allowing users to follow author
  const followUser = async () => {
    // followerId, followingId, followingUsername 
    await followAuthor(userId, authorID, authorName);
  }

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
            <h2>{authorName}</h2>
            <div className=''>•</div> {/* Centered Dot */}
            <button disabled={userId === null} onClick={followUser}>
              <h2 className='text-green-400'>Follow</h2>
            </button>

          </div>
          {/* blog details */}
          <div className='flex flex-row items-center space-x-1 md:space-x-4
           mt-4 md:mt-0'>
            {/* <h2 className=''>UI/UX Department</h2>
            <div className=''>•</div>  */}
            <h2 className='w-[100px]'>{minutesRead} min Read</h2>
            <div className=''>•</div> {/* Centered Dot */}
            <h2 className='w-[125px]'>{publishDate}</h2>
          </div>
        </div>

      </div>

      {/* claps and comments count */}
      <BlogInteraction blogId={blogId} claps={claps} commentsCount={commentsCount} userId={userId}/>

    </div>
  )
}

export default BlogAuthorHighlights