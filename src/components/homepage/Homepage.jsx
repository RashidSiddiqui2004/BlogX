import React, { useContext, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import FeaturedSection from './featured/FeaturedSection';
import CategorySection from './categories/Categories';
import TrendingBlogs from "./trending/Trending";
import Footer from "./footer/Footer";
import Loader from "../../utilities/loader/Loader";
import myContext from "../../context/data/myContext";

const Homepage = () => {

  const context = useContext(myContext);
  const { loading, setLoading} = context;

  // useEffect(()=>{
  //   setLoading(false);
  // },[])

  return (
    <div className="">
      <Navbar /> 
      
      <div className="TrendingBlogs  overflow-hidden w-[90%] m-auto">
        <FeaturedSection />
      </div>

      {/* {loading && <Loader />} */}

      <div className="CategorySection  overflow-hidden w-[90%] m-auto">
        <CategorySection />
      </div>
      
      <div className="TrendingBlogs  overflow-hidden w-[90%] m-auto">
 
        <TrendingBlogs />
      </div>
      
      <Footer/>
 
    </div>
     
  );

}

export default Homepage;
