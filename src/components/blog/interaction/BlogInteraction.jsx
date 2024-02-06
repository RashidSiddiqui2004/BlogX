
import React, { useContext } from 'react'
import { PiHandsClappingBold } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";
import copyToClipboard from '../../../utilities/copyClipBoard/CopyClipboard';
import myContext from '../../../context/data/myContext';

const BlogInteraction = ({ blogId, claps, commentsCount, userId }) => {

    const context = useContext(myContext);
    const { clapBlog } = context;

    // for clapping -> await clapBlog(userId, blogId, currLikes)

    function debounce(func, delay) {
        let timeoutId;

        return function () {
            const context = this;
            const args = arguments;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        };
    }

    const throttleClapBlog = debounce(function () {
        clapBlog(userId, blogId, claps);
    }, 5000);

    return (
        <div>
            <div className='flex flex-row mx-8 md:mx-16 mt-5 mb-4 space-x-8 md:space-x-16'>
                <div className='flex flex-row space-x-3'>
                    <button disabled={(userId === null)}
                        onClick={() => throttleClapBlog()}>
                        <PiHandsClappingBold className='text-2xl' />
                    </button>

                    <span className='text-lg font-semibold '>{claps}</span>
                </div>
                <div className='flex flex-row space-x-3'>
                    <FaRegComment className='text-2xl' />
                    <span className='text-lg font-semibold '>{commentsCount}</span>
                </div>

                <div className='flex flex-row space-x-3 cursor-pointer'
                    onClick={copyToClipboard}>
                    <MdIosShare className='text-2xl' />
                    <span className='text-lg font-semibold hidden md:block'>Share this Blog</span>
                </div>

            </div>
        </div>
    )
}

export default BlogInteraction
