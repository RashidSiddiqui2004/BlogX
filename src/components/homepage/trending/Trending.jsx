import React, { useContext, useEffect } from "react";
import myContext from "../../../context/data/myContext";
import BlogCard from "./BlogCard";  
import extractFirstXWords from "../../../utilities/initials/fetchXWords";
import getEncodedTitle from "../../../utilities/fetchURLTitle/GetEncodedTitle";

function TrendingBlogs() {
  const context = useContext(myContext);
  const { mode, trendingBlogs, getTrendingBlogs } = context;

  useEffect(() => {

    const fetchAllTrendingBlogs = async () => {
      await getTrendingBlogs()
    };

    fetchAllTrendingBlogs();
  }, [])

  return (
    <div className="flex flex-col py-12 md:mx-[6%]">
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
          <div className="mt-2 text-5xl text-start  space-around tracking-tight leading-12  ma-md:max-text-sm max-md:max-w-full max-md:text-4xl max-md:leading-10">
            Stay Updated with Our <br /> Latest Insights
          </div>
        </div>
      </div>


      <div className="px-5 mt-10 w-full max-md:max-w-full">
        <div className="grid md:grid-cols-2 h-full gap-x-16 gap-y-10">
          {
            trendingBlogs && trendingBlogs.slice(0, 6).map((blog, index) => {

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
              } = blog;
 

              let shortSummary = extractFirstXWords(summary, 15);
              shortSummary += ' ...'

              let shortTitle = extractFirstXWords(title, 5);
              shortSummary += ' ...'

              const encodedTitle = getEncodedTitle(title);

              return (
                // <center>
                <div key={index}>
                  <BlogCard blogid={id} title={shortTitle} urlTitle={encodedTitle} description={description}
                    summary={shortSummary} department={department} blogPoster={blogPoster}
                    author={author} tags={tags} claps={claps} date={date} authorId={authorId} minutesRead={minutesRead} />
                </div>
                // </center>
              )

            })
          }


        </div>
      </div>

      {/* <div className="flex flex-col">
        <div
          className={`justify-center self-end px-6 py-2 mt-5 text-base whitespace-nowrap border rounded-lg border-solid ${mode === "dark"
            ? "bg-customBlue rounded-lg text-white border-neutral-50"
            : "bg-neutral-80 text-zinc-800"
            } border-opacity-40 max-md:px-10 max-md:mt-10 `}
          style={{ transform: "translateX(-30px)" }}
        >
          <button onClick={handleSeeMoreClick}>See More</button>
        </div>
      </div> */}

    </div>
  );
}

export default TrendingBlogs;
