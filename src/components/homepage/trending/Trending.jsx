// TrendingBlogs.js

import React, { useContext, useEffect } from "react";
import myContext from "../../../context/data/myContext";
import Newblogcard from "./Newblogcard";
import extractFirstXWords from "../../../utilities/initials/fetchXWords";
import getEncodedTitle from "../../../utilities/fetchURLTitle/GetEncodedTitle";
import "./styles.css"; // Adjust the path to your CSS file

function TrendingBlogs() {
  const context = useContext(myContext);
  const { mode, trendingBlogs, getTrendingBlogs } = context;

  useEffect(() => {
    const fetchAllTrendingBlogs = async () => {
      await getTrendingBlogs();
    };

    fetchAllTrendingBlogs();
  }, []);

  return (
    <div className={`flex flex-col py-12 md:mx-[6%] blur-container`}>
      <div className="flex flex-col gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
        <div
          className={`flex flex-col px-5 font-semibold max-md:max-w-full ${
            mode === "dark"
              ? "bg- rounded-lg text-white"
              : "bg-neutral-80 text-zinc-800"
          }`}
        >
          <div className="text-start font-extrabold flex flex-col text-sm text-sky-500 uppercase max-md:max-w-full">
            Trending Topics
          </div>
          <div className="mt-2 text-[52px] text-start font-extrabold space-around tracking-tight leading-[1]  ma-md:max-text-sm max-md:max-w-full max-md:text-4xl max-md:leading-10">
            Stay Updated with Our <br /> Latest Insights
          </div>
        </div>
        <div className="justify-end font-extrabold self-end px-6 py-2 rounded-lg text-base text-white whitespace-nowrap bg-sky-500 border border-sky-500 border-solid max-md:px-5 max-md:mt-10">
          See More
        </div>
      </div>

      <div className="px-5 mt-10 w-full max-md:max-w-full">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {trendingBlogs &&
            trendingBlogs.slice(0, 6).map((blog, index) => {
              const {
                title,
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
              shortSummary += " ...";

              let shortTitle = extractFirstXWords(title, 5);
              shortSummary += " ...";

              const encodedTitle = getEncodedTitle(title);

              return (
                <div key={index} className="blog-card">
                  <Newblogcard
                    blogid={id}
                    title={shortTitle}
                    urlTitle={encodedTitle}
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default TrendingBlogs;
