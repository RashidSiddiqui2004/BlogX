
import React, { useState, useContext } from 'react';
import "./styles.css";
import myContext from '../../../context/data/myContext'; 
import { IoMdSend } from "react-icons/io"; 

const CommentForm = ({ blogId, userId, username}) => {

  const [comment, setComment] = useState("");

  const context = useContext(myContext);

  const { mode, commentOnBlog } = context;

  const isDarkTheme = (mode === 'dark');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;

    await commentOnBlog(blogId, userId, comment, username);

    setComment('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center md:flex-row gap-4 mb-8 animate__animated animate__fadeIn">
      <input
        type="text"
        placeholder="What's your view on this blog...."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 px-4 py-1 h-16 text-white rounded-md focus:outline-none hidden md:block
         focus:border-blue-500 transition duration-300 border-[0.1px] border-slate-400 bg-slate-900"
      />
      <input
        type="text"
        placeholder="Your views..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 px-4 py-1 h-16 text-slate-900 rounded-md focus:outline-none block md:hidden
         focus:border-blue-500 transition duration-300 border-2"
      />
      <button type="submit" className="bg-slate-900 rounded-lg text-white
       hidden md:block px-8 py-2 text-xl cursor-pointer shadow-sm border-[0.5px] border-slate-100 font-thin
      duration-300 hover:scale-95 transition-all">
        Comment
      </button>
      <button type="submit" className="flex md:hidden text-slate-900 text-2xl">
        <IoMdSend className={`my-[5px] ml-2 cursor-pointer
         ${isDarkTheme ? 'text-white' : 'text-slate-950'}`} />
      </button>
    </form>
  );
};

export default CommentForm;
