

import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext';
import { Link, useParams } from 'react-router-dom';
import extractFirstXWords from '../../utilities/initials/fetchXWords'
import deptMap from '../../utilities/departments/DepartmentMap'
import RecentDeptBlogs from './RecentDeptBlogs';
import getEncodedTitle from '../../utilities/fetchURLTitle/GetEncodedTitle';

const DepartmentBlogsMobile = () => {

    const context = useContext(myContext);

    const { mode, deptBlogs, getDepartmentBlogs } = context;

    const isDarkTheme = (mode == "dark");

    const params = useParams();
    const departmentName = params.deptName;

    const department = deptMap.get(departmentName);

    // get dept specific blogs

    useEffect(() => {

        const fetchDeptBlogs = async () => {
            try {
                // Fetch dept blogs data
                const deptBlogsData = await getDepartmentBlogs(departmentName);

            } catch (error) {
                console.log(error);
            }
        }

        fetchDeptBlogs();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mt-10 w-full max-md:max-w-full min-h-screen">

            <h1 className={`text-2xl md:text-5xl justify-center font-semibold my-3 py-3 border-y ${isDarkTheme ? 'text-white' : 'text-zinc-800'}`}>{department}</h1>

            <h2 className={`text-lg flex justify-start mx-[5%] font-semibold ${isDarkTheme ? 'text-white' : 'text-zinc-800'}`}>All blog posts</h2>
            {
                (deptBlogs.length >= 1)

                    ?

                    <div className="mx-[5%] my-10">

                        <div className='grid gap-x-8'>

                            <div>

                                {
                                    deptBlogs && deptBlogs?.map((blog, index) => {

                                        const { title,
                                            summary,
                                            author,
                                            blogPoster,
                                            tags,
                                            claps,
                                            minutesRead,
                                            date,
                                            id,
                                        } = blog;

                                        let shortSummary = extractFirstXWords(summary, 40);
                                        shortSummary += ' ...';

                                        const encodedTitle = getEncodedTitle(title);

                                        return (
                                            <Link to={`/blog/${encodedTitle}/${id}`} key={index}>
                                                <RecentDeptBlogs blogid={id} title={title}
                                                    summary={shortSummary} blogPoster={blogPoster}
                                                    author={author} tags={tags} claps={claps}
                                                    publishDate={date} minutesRead={minutesRead}
                                                />
                                            </Link>
                                        )

                                    })
                                }

                            </div>


                        </div>

                    </div>

                    :

                    <>
                    </>
            }


        </div>
    )
}

export default DepartmentBlogsMobile