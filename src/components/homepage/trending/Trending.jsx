import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../../context/data/myContext";
import BlogCard from "./BlogCard";
import { Link } from 'react-router-dom'

function TrendingBlogs() {
  const context = useContext(myContext);
  const { mode, allBlogs, getTrendingBlogs } = context;
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    navigate("/trending-blogs"); // Navigate to the trending blogs page
  };

  function extractFirst30Words(htmlString) {
    // Remove HTML tags
    const plainText = htmlString.replace(/<[^>]*>/g, '');

    // Extract first 30 words
    const words = plainText.split(/\s+/);
    const first30Words = words.slice(0, 30).join(' ');

    return first30Words;
}

  useEffect(() => {

    const fetchAllTrendingBlogs = async () => {
      await getTrendingBlogs();
    }

    fetchAllTrendingBlogs();
  }, [])

  return (
    <div className="flex flex-col py-12">
      <div className="flex gap-5 justify-between mt-8 w-full max-md:flex-wrap max-md:max-w-full ">
        <div
          className={`flex text-start flex-col px-5 font-semibold max-md:max-w-full ${mode === "dark"
            ? "bg- rounded-lg text-white"
            : "bg-neutral-80 text-zinc-800"
            }`}
        >
          <div className="text-sm text-sky-500 uppercase max-md:max-w-full ">
            Trending Topics
          </div>
          <div className="mt-2 text-5xl text-start  space-around tracking-tight leading-12  max-md:max-w-full max-md:text-4xl max-md:leading-10">
            Stay Updated with Our <br /> Latest Insights
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div
          className={`justify-center self-end px-6 py-2 mt-5 text-base whitespace-nowrap border rounded-lg border-solid ${mode === "dark"
            ? "bg-customBlue rounded-lg text-white border-neutral-50"
            : "bg-neutral-80 text-zinc-800"
            } border-opacity-40 max-md:px-10 max-md:mt-10 `}
          style={{ transform: "translateX(-30px)" }}
        >
          <button onClick={handleSeeMoreClick}>See More</button>
        </div>
      </div>


      <div className="px-5 mt-10 w-full max-md:max-w-full">
        <div className="grid md:grid-cols-3">
          {
            allBlogs && allBlogs.map((item, index) => {

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

              let shortSummary = extractFirst30Words(summary);
              shortSummary+= ' ...'

              return (
                <Link to={`/blog/${id}`} key={index}>
                  <BlogCard blogid={id} title={title} description={description}
                    summary={shortSummary} department={department} blogPoster={blogPoster}
                    author={author} tags={tags} claps={claps} date={date} authorId={authorId} minutesRead={minutesRead} />
                </Link>
              )

            })
          }

        
        </div>
      </div>


    </div>
  );
}

export default TrendingBlogs;
