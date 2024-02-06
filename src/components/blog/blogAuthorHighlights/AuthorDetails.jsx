
import React, { useContext } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import myContext from '../../../context/data/myContext';

const AuthorDetails = ({ blog, followersCnt, userId }) => {

    const context = useContext(myContext);
    const { mode, followAuthor } = context;

    const { authorId, author } = blog;

    // function for allowing users to follow author
    const followUser = async () => {
        // followerId, followingId, followingUsername 
        await followAuthor(userId, authorId, author);
    }

    return (
        <div className='py-8 flex md:mx-[20%] justify-center md:gap-x-28'>
            <div className='mx-4 my-3 flex flex-col justify-start'>

                <div className='flex justify-center my-2'>
                    <FaCircleUser className='text-5xl rounded-xl' />
                </div>

                <h2 className='font-semibold text-sm md:text-2xl'>Written by {author}</h2>
                <h3>{followersCnt} Follower{followersCnt > 1 ? 's' : ''}</h3>

                <button className="bg-gray-800 text-white px-6 py-4 mt-2 text-sm md:text-lg
                rounded-lg hover:bg-gray-700 focus:outline-none focus:ring
                 focus:border-blue-300">
                    More from {author}
                </button>

            </div>

            <div className='mx-4 my-12 md:my-16 flex flex-col justify-start'>
                <button className="bg-gray-800 text-white px-6 py-4 outline-none hover:outline-none
                rounded-lg hover:bg-gray-700 focus:outline-none focus:ring"
                    disabled={userId === null}
                    onClick={followUser}>
                    Follow
                </button>
            </div>

        </div>
    )
}

export default AuthorDetails