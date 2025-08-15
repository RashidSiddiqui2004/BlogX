import React, { useContext, useEffect, useState } from "react";
import myContext from "../../../context/data/myContext";
import FeaturedBlog from "./FeaturedBlog";
import "./FeaturedSection.css"; 

function FeaturedSection() {
  const context = useContext(myContext);
  const { mode, getFeaturedBlogs } = context;
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const numFeaturedBlogs = featuredBlogs.length;

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      await getFeaturedBlogs().then((featur_blogs) => {
        setFeaturedBlogs(featur_blogs);
      });
    };
    fetchFeaturedBlogs();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % numFeaturedBlogs);
    }, 7000);
    return () => clearInterval(intervalId);
  }, [numFeaturedBlogs]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === numFeaturedBlogs - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? numFeaturedBlogs - 1 : prevIndex - 1));
  };

  return (
    <div className=" mt-4 md:mt-[8%]">
      <div className="md:w-[6%] md:mt-10">
        <button
          className={`prev mr-3 ${
            mode === "dark" ? "bg- rounded-lg text-white" : "bg-neutral-80 text-zinc-800"
          }`}
          onClick={handlePrev}
        >
          ←
        </button>
        <button
          className={`next mr-3 ${
            mode === "dark" ? "bg- rounded-lg text-white" : "bg-neutral-80 text-zinc-800"
          }`}
          onClick={handleNext}
        >
          →
        </button>
      </div>

      <div className="featured-blog-container md:mt-0 mt-[-10%]">
        <FeaturedBlog mode={mode} featuredBlogs={featuredBlogs} currentIndex={currentIndex} />
      </div>

      <div className="border-b border-gray-300 mt-0 md:mt-12"></div>
    </div>
  );
}

export default FeaturedSection;
