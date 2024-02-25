
import React, { useContext, useState } from 'react'
import { PiHandsClappingBold } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";
import myContext from '../../../context/data/myContext';
import copyToClipboard from '../../../utilities/copyClipBoard/CopyClipboard'; 
import { toast } from 'react-toastify';

const BlogInteraction = ({ blogId, claps, commentsCount, userId, blog }) => {

    const context = useContext(myContext);
    const { clapBlog } = context;

    // const [blogClaps, setBlogClaps] = useState(claps);
    // for clapping -> await clapBlog(userId, blogId, currLikes)
    // debounce function so that user can click this fn only once in 5sec

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
        // setBlogClaps((prevClaps) => prevClaps + 1);
        clapBlog(userId, blogId, claps, blog);
    }, 1500);

    return (
        <div className='mt-[-1.2%] mb-[-1%]'>
            <div className='flex flex-row justify-between mx-8 md:mx-0 mt-5 mb-4 space-x-8 md:space-x-16'>
                <div className='flex flex-row space-x-3'>
                    <button disabled={(userId === null)} 
                    onClick={ () => {
                        throttleClapBlog(); 
                        }} >
                        <PiHandsClappingBold className='text-2xl font-thin' />
                    </button>
                    <span className='text-lg font-semibold'>{claps}</span>
                </div>
                <div className='flex flex-row space-x-3'>
                    <FaRegComment className='text-2xl' />
                    <span className='text-lg font-semibold'>{commentsCount}</span>
                </div>
                <div className='flex flex-row space-x-3 cursor-pointer'
                onClick={ () => {
                    copyToClipboard();
                    toast.success('Blog Link copied', {
                        position: 'top-right',
                        autoClose: 800,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    }}>
                    <MdIosShare className='text-2xl  text-sky-300' />
                    <span className='text-md font-normal text-sky-300 hidden md:block'>Share this Blog</span>
                </div>
            </div>
        </div>
    )
}

export default BlogInteraction
