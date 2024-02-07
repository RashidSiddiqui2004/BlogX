import React from "react";
 
import Navbar from "./navbar/Navbar";
import FeaturedSection from './featured/FeaturedSection'
import TrendingBlogs from "./trending/Trending";

import Footer from "./footer/Footer";
 
const Homepage = () => {
  return (
    <div className="">
      <Navbar /> 
      
      <div className="TrendingBlogs  overflow-hidden w-[90%] m-auto">
        <FeaturedSection />
 

      <div className="TrendingBlogs  overflow-hidden w-full">
 
        <TrendingBlogs />
      </div>
      
      <Footer/>
    </div>
    </div>
  );

}

export default Homepage;
