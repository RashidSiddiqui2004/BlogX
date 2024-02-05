import React, { useState, useContext } from "react";
import "./styles.css";
import myContext from "../../../context/data/myContext";
import getUsernameByUID from "../../../utilities/userData/GetUser";
import { IoMdSend } from "react-icons/io";

const CommentForm = ({ post_id }) => {
  const [comment, setComment] = useState("");

  const context = useContext(myContext);

  // const { writeComment } = context;

  // const uid = auth?.currentUser?.uid;

  // const [u_name, setUser] = useState('');

  // getUsernameByUID(uid).then((username) => {
  //   if (username) {
  //     setUser(username);
  //   } else {
  //     console.log(`User with UID ${uid} not found.`);
  //   }
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    // writeComment(post_id, uid, comment, u_name);
    setComment("");

    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center md:flex-row gap-4 mb-8 animate__animated animate__fadeIn"
    >
      <input
        type="text"
        placeholder="What's your view on this blog...."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 p-4 h-16 text-slate-800 rounded-md focus:outline-none
         focus:border-blue-500 transition duration-300 border-2"
      />
      <button
        type="submit"
        className="bg-blue-400 text-white hidden md:block rounded-md px-8 py-4 text-xl cursor-pointer transition duration-300 hover:bg-blue-500"
      >
        Comment
      </button>
      <button type="submit" className="flex md:hidden text-slate-900 text-2xl">
        <IoMdSend className="my-[5px] ml-2 cursor-pointer" />
      </button>
    </form>
  );
};

export default CommentForm;
