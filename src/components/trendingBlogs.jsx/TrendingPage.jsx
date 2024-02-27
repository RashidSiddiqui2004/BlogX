
import React, { useContext, useEffect, useState } from "react"; 
import { Link } from 'react-router-dom'
import myContext from "../../context/data/myContext"; 
import Newblogcard from "../homepage/trending/Newblogcard";
import extractFirstXWords from "../../utilities/initials/fetchXWords";
import Pagination from "../pagination/Pagination";

function TrendingPage() {

  const context = useContext(myContext);
  const { mode, trendingBlogs, getTrendingBlogs } = context;

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
      await getTrendingBlogs()
    };

    fetchAllTrendingBlogs();
  }, [])


  return (
    <div className="flex flex-col py-12 w-[90%] mx-[6%]">
      <div className="flex gap-5 justify-between mt-8 w-full max-md:flex-wrap
       max-md:max-w-full">
        <div
          className={`flex text-start flex-col px-5 font-semibold max-md:max-w-full ${mode === "dark"
            ? "bg- rounded-lg text-white"
            : "bg-neutral-80 text-zinc-800"
            }`}
        >
          <div className="text-sm font-extrabold  pt-10 text-sky-500 uppercase max-md:max-w-full ">
            Trending Topics
          </div>
          <div className="mt-2 font-extrabold  text-5xl text-start  space-around tracking-tight leading-12  ma-md:max-text-sm max-md:max-w-full max-md:text-4xl max-md:leading-10">
            Stay Updated with Our <br /> Latest Insights
          </div>
        </div>
      </div>

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
              shortSummary += ' ...'

              return (
                <Link to={`/blog/${title}/${id}`} key={index}>
                  <Newblogcard blogid={id} title={title} description={description}
                    summary={shortSummary} department={department} blogPoster={blogPoster}
                    author={author} tags={tags} claps={claps} date={date} authorId={authorId} minutesRead={minutesRead} />
                </Link>
              )

            })
          }


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
