
import React from 'react'
import RenderHTMLContent from '../../../utilities/htmlRenderer/RenderHTMLContent'
import { Link } from 'react-router-dom' 

const FeaturedBlog = ({featuredBlogs, currentIndex,mode}) => {
    return (
        <div className="flex flex-col-reverse md:flex-row py-10 md:py-4 transition-all">

            <div className="flex gap-5 justify-between mt-8 w-full max-md:flex-wrap max-md:max-w-full ">

                <div
                    className={`flex text-start flex-col px-5 font-semibold max-md:max-w-full ${mode === "dark"
                        ? "rounded-lg text-white"
                        : "bg-neutral-80 text-zinc-800"
                        }`}
                >
                    <div className="flex flex-row gap-x-5">
                        <div className="text-sm text-sky-500 uppercase max-md:max-w-full">
                            Featured Blogs
                        </div>
                        <div className={`text-sm px-3 py-1 rounded-sm
            ${mode === "dark" ? 'bg-gray-200 text-slate-800' : 'bg-slate-700 text-white'}`}>
                            {featuredBlogs[currentIndex]?.department}
                        </div>
                    </div>

                    <div className="mt-2 text-3xl text-start space-around tracking-tight leading-12 max-md:max-w-full max-md:text-4xl max-md:leading-10 ">
                        {featuredBlogs[currentIndex]?.title}
                    </div>
                    <div className={`text-lg text-start mt-7 space-around tracking-tight leading-12 md:max-w-full md:text-xl max-md:leading-10
          font-light ${mode === "dark"
                            ? "rounded-lg text-white"
                            : "bg-neutral-80 text-zinc-800"}`}>
                        {featuredBlogs[currentIndex]?.summary && <RenderHTMLContent htmlContent={featuredBlogs[currentIndex]?.summary} />}
                    </div>
                    <div
                        className={`justify-center self-start ml-7 px-6 py-2 mt-5 text-base whitespace-nowrap border rounded-lg border-solid ${mode === "dark"
                            ? "bg-customBlue rounded-lg text-white border-neutral-50"
                            : "bg-neutral-80 text-zinc-800"
                            } border-opacity-40 max-md:px-10 max-md:mt-10`}
                        style={{ transform: "translateX(-30px)" }}
                    >
                        <Link to={`/blog/${featuredBlogs[currentIndex]?.title}/${featuredBlogs[currentIndex]?.id}`}>
                            <button>See More</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="md:w-[100%] md:ml-5 flex justify-center items-center transition-transform duration-500 ease-in-out">
                <img src={featuredBlogs[currentIndex]?.blogPoster} alt="" className="max-w-full max-h-full" />
            </div>
        </div>
    )
}

export default FeaturedBlog