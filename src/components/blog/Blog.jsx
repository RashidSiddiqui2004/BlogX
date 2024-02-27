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
import RecommendedBlogs from './recommendedBlogs/RecommendedBlogs';


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
        
        setBlogHeight(document.getElementById('parent').offsetHeight)

        console.log(blogheight)

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

  }, [blogId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (

    <div style={{ color: mode === 'dark' ? 'white' : '' }} className='overflow-hidden'>
      <Navbar />
      <div className='hidden left-0 md:mt-20 md:ml-16 2xl:ml-24 absolute md:inline-block min-w-56 w-60 max-w-72'
      style={{
        height : `${blogheight-100}px`
      }}>

          {/* blog navigation */}

          <BlogNavigation blogheight={blogheight}
          navigation={blogState?.sectionTitles} />
        </div>
        <div className='w-[100%] md:w-[55%] md:mt-14 inline-block' id='parent'>
          <h1 className='text-3xl md:text-6xl md:ml-0 text-left font-bold mx-6 mt-8 mb-6 pl-4'>{blogState?.title}</h1>
          <div className='md:w-[75%] mr-6 mt-4 pt-5'>
 
            {/* <div className='flex flex-row mt-8'>
        <div className='w-[100%] md:w-[70%] md:ml-48 md:mt-14'>

          <h1 className='mt-4 bg-slate-800 rounded-md w-fit px-3 py-1 mx-6 '>{blogState?.department ? blogState.department : 'Department'}</h1>
          <h1 className='text-3xl md:text-6xl md:ml-0 text-left font-bold mx-6 mt-4 mb-6 pl-4'>{blogState?.title}</h1>
          <div className='md:w-[75%] md:mr-6 mt-4 pt-5'>  */}
 
            <BlogAuthorHighlights userId={userId} blog={blogState} blogId={blogId} commentsCount={commentsCnt} />
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
                  <div className="container mx-auto py-4 flex flex-row justify-center gap-x-7
                rounded-xl my-6">

                    {resources && Object.entries(resources).map(([index, file]) => (

                      <div key={index} className="mb-4">

                        <div className="p-4 rounded-md flex items-center">
                          {file && (
                            <>
                              <label>
                                <a href={file?.fileURL} target="_blank">
                                  <img className="w-24 h-24" src={PDF} alt="PDF Icon" />
                                </a>


                                <a href={file?.fileURL} target="_blank" rel="noopener noreferrer"
                                  className="hover:underline py-3 text-sm">{file?.filename}</a>

                              </label>
                            </>
                          )}
                        </div>
                      </div>
                    ))}

                  </div>}

                {images?.length >= 1
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

          <div className={`my-10 md:mx-6 border-2 border-l-0 border-r-0 ${isDarkTheme ? 'border-gray-800' : 'border-gray-100'}`}>
            <BlogInteraction blogId={blogId} claps={blogState?.claps} commentsCount={commentsCnt} userId={userId} blog={blogState} />


          </div>
        </div>
      {userId !== null ? (
        <div className='mx-4 md:mx-auto md:w-[65%]'>
          <CommentForm blogId={blogId} userId={userId} username={userName} />
        </div>
      ) : (
        <div className='bg-gray-800 rounded-lg shadow-lg p-6 text-white'>
          <p className='text-lg mb-4'>Please sign in to leave a comment.</p>
          <Link to={'/login'}>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>Sign In</button>
          </Link>
        </div>
      )}

      <div className='md:flex md:flex-row'>
        <div className='mx-4 md:w-[45%] md:mx-auto' id='Starting with React'>
          <CommentSection comments={comments} />
        </div>
        <div className='md:w-[45%] md:mx-auto' id='Starting with React'>
          <RecommendedBlogs author={blogState.author} authorSpecificBlogs={authorSpecificBlogs} />
        </div>
      </div>



      <Footer />
    </div>
  );
};

export default Blog;
