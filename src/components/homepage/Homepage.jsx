import React from "react";
import TrendingBlogs from "./trending/Trending";
import Navbar from "./navbar/Navbar"; 

const Homepage = () => {
  return (
    <div className="">
      <Navbar />

      <div className="TrendingBlogs  overflow-hidden w-full">
        <TrendingBlogs />
      </div>
    </div>
  );
};

export default Homepage;
