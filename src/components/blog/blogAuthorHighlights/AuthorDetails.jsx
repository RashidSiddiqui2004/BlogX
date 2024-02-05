
import React from 'react'
import { FaCircleUser } from "react-icons/fa6";

const AuthorDetails = ({ authorName, followersCnt }) => {
    return (
        <div className='py-8 flex mx-[20%] justify-center gap-x-28'>
            <div className='mx-4 my-3 flex flex-col justify-start'>
                <div className='flex justify-center my-2'>
                    <FaCircleUser className='text-5xl rounded-xl' />
                </div>

                <h2 className='font-semibold text-2xl'>Written by {authorName}</h2>
                <h3>{followersCnt} Follower {followersCnt > 1 ? 's' : ''}</h3>
                <button className="bg-gray-800 text-white px-6 py-4
                rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300">
                    More from {authorName}
                </button>

            </div>

            <div className='mx-4 my-16 flex flex-col justify-start'>
                <button className="bg-gray-800 text-white px-6 py-4
                rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300">
                    Follow
                </button>
            </div>

        </div>
    )
}

export default AuthorDetails