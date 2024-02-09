import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../../context/data/myContext";
import BlogCard from "./BlogCard";
import { Link } from 'react-router-dom'
import extractFirstXWords from "../../../utilities/initials/fetchXWords";

function TrendingBlogs() {
  const context = useContext(myContext);
  const { mode, allBlogs, getTrendingBlogs } = context;

  // const navigate = useNavigate();

  // const handleSeeMoreClick = () => {
  //   navigate("/trending-blogs"); // Navigate to the trending blogs page
  // };
 
  useEffect(() => {

    const fetchAllTrendingBlogs = async () => {
      await getTrendingBlogs()
    };

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
          <div className="mt-2 text-5xl text-start  space-around tracking-tight leading-12  ma-md:max-text-sm max-md:max-w-full max-md:text-4xl max-md:leading-10">
            Stay Updated with Our <br /> Latest Insights
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col h-full">
            <div className="bg-white shadow-md p-4 flex-grow"> 
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.content}</p>
            </div>
          </div>
        ))}
      </div> */}


      <div className="px-5 mt-10 w-full max-md:max-w-full">
        <div className="grid md:grid-cols-3 h-full gap-x-4">
          {
            allBlogs && allBlogs.slice(0, 6).map((blog, index) => {

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

              let shortSummary = extractFirstXWords(summary, 30);
              shortSummary += ' ...'

              return (
                <Link to={`/blog/${title}/${id}`} key={index}>
                  <BlogCard blogid={id} title={title} description={description}
                    summary={shortSummary} department={department} blogPoster={blogPoster}
                    author={author} tags={tags} claps={claps} date={date} authorId={authorId} minutesRead={minutesRead} />
                </Link>
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
