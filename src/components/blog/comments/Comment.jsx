
import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ comment }) => {

    const context = useContext(myContext);
    const { mode } = context;

    const isDarkTheme = mode === 'dark';

    const commentTime = comment.timestamp.toDate();
    const relativeTime = formatDistanceToNow(commentTime, { addSuffix: true });

    const userProfileImg = "https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"

    return (
        <div
            className={`text-sm md:text-md pr-4 pt-5 pb-3 rounded-sm shadow-md
         ${isDarkTheme ? 'text-white' : 'text-slate-900 '}`}>
            <div className="flex items-center">
                <img
                    src={userProfileImg}
                    alt='User Avatar'
                    className="w-10 h-10 rounded-full object-cover mr-2"
                />
                <div className='justify-center flex flex-col mx-4 w-[100%]'>
                    <div className='flex justify-between w-[100%]'>
                        <h3 className="font-semibold">{comment.username}</h3>
                        <h3 className="font-normal">{relativeTime}</h3>
                    </div>
                </div>

            </div>
            <p className="mt-2 flex justify-start mx-16 text-justify">{comment.comment}</p>
        </div>
    )
}

export default Comment


{/* <div className='flex flex-row'>
                <button className='bg-green-200 my-2 px-2 py-1 rounded-md'
                    onClick={() => { likeComment(commentData.id) }}>Like</button>
                <span className='bg-red-200 rounded-md mx-2 my-2 px-2 py-1'>{commentData.hasOwnProperty('likes') ? commentData.likes : 0} Likes</span>
                <span className=' mx-3 my-2 px-2'>|</span>
                <button className='bg-gray-600 text-white my-2 px-2 py-1 rounded-md'
                onClick={replyToComment}>Reply</button>
     </div> */
}