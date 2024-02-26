
import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import { Link, useParams } from 'react-router-dom';
import extractFirstXWords from '../../utilities/initials/fetchXWords'
import RecentDeptBlogs from './RecentDeptBlogs';
import ShortDeptBlog from './ShortDeptBlog';
import getEncodedTitle from '../../utilities/fetchURLTitle/GetEncodedTitle';
import NewBlogLayout from './NewBlogLayout';
import Pagination from './Pagination';

const DepartmentBlogs = () => {

    const context = useContext(myContext);
    const { mode, deptBlogs, getDepartmentBlogs } = context;

    const numberBlogs = deptBlogs.length;

    const isDarkTheme = (mode == "dark");

    const params = useParams();
    const departmentName = params.deptName;

    const thresholdBlogs = 4;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.floor((numberBlogs - thresholdBlogs) / 6 +
        (((numberBlogs - thresholdBlogs) % 6) ? 1 : 0));

    const startBlogNumber = thresholdBlogs + (currentPage - 1) * 6;

    const handlePageChange = (newPageNumber) => {
        setCurrentPage(newPageNumber)
    }


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

        window.scrollTo(0, 0);
        fetchDeptBlogs();

    }, []);


    return (
        
        <div className="w-full max-md:max-w-full min-h-screen md:py-6">

            {/* <h1 className={`text-2xl md:text-5xl justify-center font-semibold mb-3 py-3 ${isDarkTheme ? 'text-white' : 'text-zinc-800'}`}>{department}</h1> */}

            {
                deptBlogs && deptBlogs?.length > 0

                    ?

                    <div className="mx-[5%]">

                        <h2 className={`text-lg flex justify-start font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-zinc-800'}`}>Recent blog posts</h2>

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

                                        let shortSummary = extractFirstXWords(summary, 15);
                                        shortSummary += ' ...'

                                        const encodedTitle = getEncodedTitle(title);

                                        return (
                                            <div key={index}>
                                                <RecentDeptBlogs blogid={id} title={title}
                                                    summary={shortSummary} blogPoster={blogPoster}
                                                    author={author} tags={tags} claps={claps}
                                                    publishDate={date} minutesRead={minutesRead}
                                                    encodedTitle={encodedTitle}
                                                />
                                            </div>
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

                                        let shortSummary = extractFirstXWords(summary, 10);
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


            <div className="mx-[5%] my-20">
                {
                    deptBlogs && deptBlogs?.slice(3, 4)?.map((blog, index) => {

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

                        let shortSummary = extractFirstXWords(summary, -1);

                        const encodedTitle = getEncodedTitle(title);

                        return (
                            <div key={index}>
                                <NewBlogLayout blogid={id} title={title}
                                    summary={shortSummary} blogPoster={blogPoster}
                                    author={author} tags={tags} claps={claps}
                                    publishDate={date} minutesRead={minutesRead}
                                    encodedTitle={encodedTitle}
                                />
                            </div>
                        )

                    })
                }
            </div>


            <div>

                {
                    (deptBlogs.slice(startBlogNumber).length > 1)

                        ?

                        <div className="mx-[5%] my-10">

                            <h2 className={`text-lg md:text-4xl flex justify-start mb-10 font-bold ${isDarkTheme ? 'text-white' : 'text-zinc-800'}`}>All blog posts</h2>

                            <div className='grid md:grid-cols-3 h-full gap-x-8'>

                                {
                                    deptBlogs && deptBlogs?.slice(startBlogNumber, startBlogNumber + 6)?.map((blog, index) => {

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

                                        let shortSummary = extractFirstXWords(summary, 15);
                                        shortSummary += ' ...';

                                        const encodedTitle = getEncodedTitle(title);

                                        return (
                                            <Link to={`/blog/${encodedTitle}/${id}`} key={index} className='mb-8'>
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

            <div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

            </div>


        </div>
    )
}

export default DepartmentBlogs