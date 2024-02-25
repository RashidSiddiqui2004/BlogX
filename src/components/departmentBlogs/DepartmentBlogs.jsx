
import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext';
import { Link, useParams } from 'react-router-dom';
import extractFirstXWords from '../../utilities/initials/fetchXWords'
import deptMap from '../../utilities/departments/DepartmentMap'
import RecentDeptBlogs from './RecentDeptBlogs';
import ShortDeptBlog from './ShortDeptBlog';
import getEncodedTitle from '../../utilities/fetchURLTitle/GetEncodedTitle';

const DepartmentBlogs = () => {

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
                return;
            }
        }

        fetchDeptBlogs();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full max-md:max-w-full min-h-screen md:py-24">

            <h1 className={`text-2xl md:text-5xl justify-center font-semibold mb-3 py-3 ${isDarkTheme ? 'text-white' : 'text-zinc-800'}`}>{department}</h1>

            {
                deptBlogs && deptBlogs?.length > 0

                    ?

                    <div className="mx-[5%]">

                        <h2 className={`text-lg flex justify-start font-semibold ${isDarkTheme ? 'text-white' : 'text-zinc-800'}`}>Recent blog posts</h2>

                        <div className='grid md:grid-cols-2 h-full gap-x-8 mb-6'>

                            <div>
                                {
                                    deptBlogs && deptBlogs?.slice(0, 1)?.map((blog, index) => {

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

                                        let shortSummary = extractFirstXWords(summary, 30);
                                        shortSummary += ' ...'

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

                            <div>
                                {
                                    deptBlogs && deptBlogs?.slice(1, 3)?.map((blog, index) => {

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

                                        let shortSummary = extractFirstXWords(summary, 5);
                                        shortSummary += ' ...';

                                        const encodedTitle = getEncodedTitle(title);

                                        return (
                                            <Link to={`/blog/${encodedTitle}/${id}`} key={index}>
                                                <ShortDeptBlog blogid={id} title={title}
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

                    <div>
                        <h1 className='text-2xl md:text-4xl font-semibold text-center
                         text-gray-700 mb-6'>No blogs in this department, apologies for the inconvenience</h1>
                    </div>
            }



            <div>

                {
                    (deptBlogs.slice(3).length >= 1)

                        ?

                        <div className="mx-[5%] my-10">

                            <h2 className={`text-lg flex justify-start font-semibold ${isDarkTheme ? 'text-white' : 'text-zinc-800'}`}>All blog posts</h2>

                            <div className='grid md:grid-cols-2 h-full gap-x-8'>

                                {
                                    deptBlogs && deptBlogs?.slice(3)?.map((blog, index) => {

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

                                        let shortSummary = extractFirstXWords(summary, 25);
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

                        :

                        <>
                        </>
                }
            </div>


        </div>
    )
}

export default DepartmentBlogs