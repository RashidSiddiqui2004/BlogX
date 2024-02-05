
import React, { useState, useContext, useEffect } from 'react';
import "./styles.css";
import myContext from '../../../context/data/myContext';
import getUsernameByUID from '../../../utilities/userData/GetUser';
import { IoMdSend } from "react-icons/io";
import getUserID from '../../../utilities/userData/GetUserID';

const CommentForm = ({ blogId }) => {

  const [comment, setComment] = useState("");

  const context = useContext(myContext);

  const { commentOnBlog } = context;

  const [u_name, setUser] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = await getUserID();
        const username = await getUsernameByUID(uid);

        if (username) {
          setUser(username);
          setUserId(uid); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;

    await commentOnBlog(blogId, userId, comment, u_name);

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
        className="flex-1 p-4 h-16 text-slate-800 rounded-md focus:outline-none hidden md:block
         focus:border-blue-500 transition duration-300 border-2"
      />
      <input
        type="text"
        placeholder="Your views..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 p-4 h-16 text-slate-800 rounded-md focus:outline-none block md:hidden
         focus:border-blue-500 transition duration-300 border-2"
      />
      <button type="submit" className="bg-slate-800 rounded-lg text-white
       hidden md:block px-8 py-4 text-xl cursor-pointer shadow-sm shadow-purple-300
      duration-300 hover:scale-95 transition-all">
        Comment
      </button>
      <button type="submit" className="flex md:hidden text-slate-900 text-2xl">
        <IoMdSend className='my-[5px] ml-2 cursor-pointer' />
      </button>
    </form>
  );
};

export default CommentForm;