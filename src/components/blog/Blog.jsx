import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../homepage/navbar/Navbar';
import BlogAuthorHighlights from './blogAuthorHighlights/BlogAuthorHighlights';
import RenderHTMLContent from '../../utilities/htmlRenderer/RenderHTMLContent';
import myContext from '../../context/data/myContext';
import CommentForm from './comments/CommentForm';
import TagSection from './tags/TagSection';
import BlogInteraction from './interaction/BlogInteraction';
import CommentSection from './comments/CommentSection';
import Footer from '../homepage/footer/Footer';
import getUserID from '../../utilities/userData/GetUserID';
import getUsernameByUID from '../../utilities/userData/GetUser';
import BlogNavigation from './BlogNavigation';
import OutputCode from '../code-editor/OutputCode';

import './image.css'

import extractText from '../../utilities/initials/getContent';
import PDF from './pdfImage.svg'
import Word from './ms-word.svg'
import RecommendedBlogs from './recommendedBlogs/RecommendedBlogs';
import getFileType from '../../utilities/filetype/GetFileType'


const Blog = () => {
  const context = useContext(myContext);
  const { mode, getBlogData, getFollowersCount, getCommentsForBlog,
    authorSpecificBlogs, getAuthorBlogs } = context;
  const isDarkTheme = mode === 'dark';

  const params = useParams();
  const blogId = params.blogID;

  const [followersCnt, setFollowersCnt] = useState(0);
  const [blogState, setBlogState] = useState('');
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [comments, setComments] = useState([]);

  const [commentsCnt, setCommentsCnt] = useState(0);
  const [blogheight, setBlogHeight] = useState(0)

  useEffect(() => {

    const fetchBlogData = async () => {
      try {
        const blogData = await getBlogData(blogId);
        setBlogState(blogData);

        setBlogHeight(document.getElementById('parent')?.offsetHeight)

        const followersCount = await getFollowersCount(blogData?.authorId);

        await getAuthorBlogs(blogData.authorId, blogId);

        setFollowersCnt(followersCount);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const uid = await getUserID();
        if (uid === -1) return;

        const username = await getUsernameByUID(uid);
        if (username) {
          setUserName(username);
          setUserId(uid);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsForBlog(blogId);
        setComments(commentsData);
        setCommentsCnt(commentsData.length);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    Promise.all([
      fetchBlogData(),
      fetchUserData(),
      fetchComments()
    ])

    window.scrollTo(0, 0);

  }, [blogId]);




  return (

    <div style={{ color: mode === 'dark' ? 'white' : '' }} className='overflow-hidden'>

      <Navbar />

      <div className='flex flex-row mt-8'>
        {/* <center> */}
        <div className='w-full md:w-[70%] md:ml-80 md:mt-14'>

          <div className="flex justify-start">
            <h2 className='mt-4 bg-slate-800 rounded-md w-fit px-3 py-1 mx-4'>{blogState?.department ? blogState.department : 'Department'}</h2>
          </div>
          <h1 className='text-4xl md:text-6xl md:ml-0 text-left py-3 
            sm:mx-6 mt-4 mb-6 pl-6 md:pl-4 font-bold bg-clip-text bg-gradient-to-b text-transparent from-gray-100 to-neutral-200'>{blogState?.title}</h1>

          <div className='w-full md:mx-4 md:mr-6 mt-4 pt-5'>

            <BlogAuthorHighlights userId={userId} blog={blogState} blogId={blogId} commentsCount={commentsCnt} department={blogState?.department}/>
          </div>
          {blogState?.description && (
            <div className={`ml-4 text-left ${blogState.description.includes('<img') ? 'image-left' : ''}`}>
              <RenderHTMLContent htmlContent={blogState?.description} />
            </div>
          )}

          {blogState?.blogContent?.map((section, index) => {

            const { title, content, code, resources, images } = section;

            const sectionContent = extractText(content);


            return (
              <div key={index} id={title} className='md:ml-4 mb-3 text-left mx-3'>
                <h2 className='text-2xl md:text-3xl text-left font-semibold mb-6 mt-6'>{title || ''}</h2>
                <p className='text-lg sm:text-lg text-gray-100 text-justify'>{sectionContent}</p>
                {code !== null &&
                  <div className='mt-8 mb-4'>
                    <OutputCode lang='javascript' code={code} />
                  </div>

                }

                {resources && Object.keys(resources).length > 0
                  &&
                  <div className="container mx-auto py-4
                rounded-xl my-6">

                    <h2 className="text-lg font-semibold mb-4">Resources</h2>


                    <div className=' flex flex-row justify-center gap-x-7'>

                      {resources && Object.entries(resources).map(([index, file]) => (

                        <div key={index} className="mb-4">

                          <div className="p-4 rounded-md items-center">
                            {file && (
                              <>
                                <a href={file?.fileURL} target="_blank" rel="noopener noreferrer">
                                  { file?.fileURL && getFileType(file?.fileURL) === 'pdf' ? (
                                    <img className="w-32 h-auto" src={PDF} alt="PDF file" />
                                  ) : (
                                    <img className="w-32 h-auto" src={Word} alt="Word file" />
                                  )}
                                </a>
                                <div className="ml-4">
                                  <a href={file?.fileURL} target="_blank" rel="noopener noreferrer"
                                    className="hover:underline text-slate-200 px-3 py-3 text-sm block">{file?.filename}</a>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                      ))}

                    </div>
 
                  </div>}



                {images && Object.keys(images).length > 0
                  &&
                  <div className="container mx-auto py-4 flex flex-row justify-center gap-x-7
                rounded-xl my-6">

                    {images && Object.entries(images).map(([index, file]) => (

                      <div key={index} className="mb-4">

                        <div className="p-4 rounded-md flex items-center">
                          {file && (
                            <>
                              <label>
                                <img className="w-64 h-auto" src={file?.imageURL} alt="PDF Icon" />


                                <a href={file?.imageURL} target="_blank" rel="noopener noreferrer"
                                  className="hover:underline py-3 text-sm">{file?.imageName}</a>


                              </label>
                            </>
                          )}
                        </div>
                      </div>
                    ))}

                  </div>}
              </div>
            );
          })}
          <div className='mx-6 md:mr-14 md:ml-4 mb-4 mt-6'>
            <TagSection tagList={blogState?.tags} buttonSize='large' />
          </div>

          <div className={`my-10 md:mx-6 py-2 border-2 border-l-0 border-r-0 ${isDarkTheme ? 'border-gray-800' : 'border-gray-100'}`}>
            <BlogInteraction blogId={blogId} claps={blogState?.claps} commentsCount={commentsCnt} userId={userId} blog={blogState} />


          </div>

          {
            userId !== null ? (
              <div className='mx-4 md:mx-auto md:w-[95%]'>
                <CommentForm blogId={blogId} userId={userId} username={userName} />
              </div>
            ) : (
              <div className='bg-gray-800 rounded-lg shadow-lg p-6 text-white'>
                <p className='text-lg mb-4'>Please sign in to leave a comment.</p>
                <Link to={'/login'}>
                  <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>Sign In</button>
                </Link>
              </div>
            )
          }
        </div>
        {/* </center> */}

        <div className='hidden md:block fixed md:mt-20 min-w-56 w-60 max-w-72 ml-2'>

          {/* blog navigation */}

          <BlogNavigation blogheight={blogheight}
            navigation={blogState?.sectionTitles} />
        </div>
      </div>



      <div className='md:flex md:flex-row'>
        <div className='mx-4 md:w-[45%] md:mx-auto' id='Starting with React'>
          <CommentSection comments={comments} />
        </div>
        <div className='md:w-[45%] md:mx-auto' id='Starting with React'>
          <RecommendedBlogs author={blogState.author} authorSpecificBlogs={authorSpecificBlogs} />
        </div>
      </div>



      <Footer />
    </div >
  );
};

export default Blog;
