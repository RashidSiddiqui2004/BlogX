import React from "react";
 
import Navbar from "./navbar/Navbar";

import FeaturedSection from './featured/FeaturedSection';
import CategorySection from './categories/Categories';
 
 


import TrendingBlogs from "./trending/Trending";

import Footer from "./footer/Footer";

 
const Homepage = () => {
  return (
    <div className="">
      <Navbar /> 
      
      <div className="TrendingBlogs  overflow-hidden w-[90%] m-auto">
        <FeaturedSection />
      </div>

      <div className="CategorySection  overflow-hidden w-[90%] m-auto">
        <CategorySection />
      </div>
      
      <div className="TrendingBlogs  overflow-hidden w-[90%] m-auto">
 
        <TrendingBlogs />
      </div>
      
      <Footer/>
    </div>
    </div>
  );

}

export default Homepage;
