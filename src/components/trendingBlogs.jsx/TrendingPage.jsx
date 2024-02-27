 
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import BlogCard from "../homepage/trending/BlogCard";
import Newblogcard from "../homepage/trending/Newblogcard"; 
import "./styles.css";
 
  
import Newblogcard from "../homepage/trending/Newblogcard";
import extractFirstXWords from "../../utilities/initials/fetchXWords";
import Pagination from "../pagination/Pagination";
 

function TrendingPage() {
  const context = useContext(myContext);
  const { mode, trendingBlogs, getTrendingBlogs } = context;

 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
 
  const numberBlogs = trendingBlogs.length;
  const thresholdBlogs = 0;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.floor((numberBlogs - thresholdBlogs) / 6 +
      (((numberBlogs - thresholdBlogs) % 6) ? 1 : 0));

  const startBlogNumber = thresholdBlogs + (currentPage - 1) * 6;

  const handlePageChange = (newPageNumber) => {
      setCurrentPage(newPageNumber)
  }

 

  useEffect(() => {
    const fetchAllTrendingBlogs = async () => {
      await getTrendingBlogs();
    };

    fetchAllTrendingBlogs();
  }, []);

  useEffect(() => {
    // Filter the trending blogs based on the search query
    if (searchQuery.trim() === "") {
      setFilteredBlogs(trendingBlogs);
    } else {
      const filtered = trendingBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchQuery, trendingBlogs]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-[#0f1018]">
      <div className="flex  flex-row mb-10 overflow-hidden relative  items-start pr-20 pl-10 text-white rounded-xl max-md:px-5">
        <div className="flex overflow-hidden relative flex-col justify-end items-start  pr-20 pl-10 text-white rounded-xl  max-md:px-5">
          <div className="relative justify-center px-2.5 py-1 mt-44 text-sm font-medium leading-5 whitespace-nowrap bg-indigo-500 rounded-md max-md:mt-10">
            Trending Topics
          </div>
          <div className="relative mt-4 text-4xl font-extrabold text-start leading-10 w-[720px] max-md:max-w-full">
            Stay Updated with Our Latest Insights
          </div>
        </div>
      </div>
 
      
      <input
  type="text"
  value={searchQuery}
  onChange={handleSearchInputChange}
  placeholder="Search blogs..."
  className="px-3  search-input py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300 search-input"
  style={{ width: '100%', maxWidth: '400px', fontSize: '16px' }}
/>

      <div className="flex flex-col py-12 w-[90%] mx-[6%]">
        {/* Search bar */}
      

  
      <div className="px-5 mt-10 w-full max-md:max-w-full mb-7">
        <div className="grid md:grid-cols-3 h-full gap-x-16 gap-y-4">
          { 
            trendingBlogs && trendingBlogs.slice(startBlogNumber, startBlogNumber + 6)?.map((item, index) => {

              const { title,
 
                description,
                summary,
                author,
                authorId,
                department,
                blogPoster,
                tags,
                claps,
                minutesRead,
                date,
                id,
              } = item;

              let shortSummary = extractFirstXWords(summary, 30);
              shortSummary += " ...";

              return (
                <Link to={`/blog/${title}/${id}`} key={index}>
                  <Newblogcard
                    blogid={id}
                    title={title}
                    description={description}
                    summary={shortSummary}
                    department={department}
                    blogPoster={blogPoster}
                    author={author}
                    tags={tags}
                    claps={claps}
                    date={date}
                    authorId={authorId}
                    minutesRead={minutesRead}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
 

      {(trendingBlogs.slice(startBlogNumber).length > 1) ?
                <div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
                :
                <></>
            }

 
    </div>
  );
}

export default TrendingPage;
