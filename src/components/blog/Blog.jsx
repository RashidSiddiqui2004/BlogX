
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../homepage/navbar/Navbar'
import BlogAuthorHighlights from './blogAuthorHighlights/BlogAuthorHighlights'
import RenderHTMLContent from '../../utilities/htmlRenderer/RenderHTMLContent'
import myContext from '../../context/data/myContext'
import CommentForm from './comments/CommentForm'
import TagSection from './tags/TagSection'
import BlogInteraction from './interaction/BlogInteraction'
import CommentSection from './comments/CommentSection'
import Footer from '../homepage/footer/Footer';
import AuthorDetails from './blogAuthorHighlights/AuthorDetails';
import getUserID from '../../utilities/userData/GetUserID';
import getUsernameByUID from '../../utilities/userData/GetUser';
import BlogNavigation from './BlogNavigation';
import OutputCode from '../code-editor/OutputCode';
import extractText from '../../utilities/initials/getContent'; 
import PDF from './pdfImage.svg'


const Blog = () => {

  const context = useContext(myContext);
  const { mode, getBlogData, getFollowersCount, getCommentsForBlog } = context;
  const isDarkTheme = (mode == "dark");

  const params = useParams();
  const blogId = params.blogID;

  const [followersCnt, setfollowersCnt] = useState(0);
  const [blogState, setblogState] = useState('');

  const [u_name, setUser] = useState('');
  const [userId, setUserId] = useState(null);

  const [comments, setComments] = useState([]);
  const commentsCnt = comments.length;

  // get comments
  useEffect(() => {
    async function fetchComments() {
      const cmts = await getCommentsForBlog(blogId).then((commentsData) => {
        setComments(commentsData); 
      })
    }

    fetchComments();
  }, []);

  // get blog, user and author data
  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const uid = await getUserID();

        if (uid === -1) {
          return;
        }

        const username = await getUsernameByUID(uid);

        if (username) {
          setUser(username);
          setUserId(uid);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchBlogData = async () => {
      try {
        // Fetch blog data
        const blogData = await getBlogData(blogId);
        setblogState(blogData);

        // Fetch followers count
        const followersCount = await getFollowersCount(blogData?.authorId);
        setfollowersCnt(followersCount);
      } catch (error) {
        // handle error
      }
    }

    fetchBlogData();
    fetchUserData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div style={{ color: mode === 'dark' ? 'white' : '' }}
      className='overflow-hidden'>

      <Navbar />

      <div className='flex flex-row'>

        {/* main blog content */}
        <div className='w-[100%] md:w-[75%] md:ml-24 mt-20'>

          {/* title of blog */}
          <h1 className='text-3xl md:text-5xl md:ml-16 text-left font-bold mx-6 mt-8 mb-6'>{blogState?.title}</h1>

          {/* author highlights */}
          <div className='md:w-[75%] md:mx-[10%] mx-6 mt-4 py-5'>
            <BlogAuthorHighlights userId={userId} blog={blogState} blogId={blogId} commentsCount={commentsCnt} />
          </div>

          {
            blogState?.description ?
              <div className='mx-6 '>
                <RenderHTMLContent htmlContent={blogState?.description} />
              </div>
              :
              <></>
          }


          {
            blogState?.blogContent && blogState?.blogContent?.map((section, index) => {

              const { title, content, code, resources } = section; 
              const sectionContent = extractText(content);

              return (

                <div key={index} id={title} className='md:mx-6 mb-3 px-8'>

                  <h2 className="text-2xl md:text-3xl text-left 
                  font-semibold mb-6 mt-2">{(title === null) ? '' : title}</h2>

                  <p className="text-lg sm:text-lg text-gray-100 text-justify">
                    {/* <span className="text-4xl font-bold">{sectionContent.charAt(1)}</span> */}
                    {sectionContent}
                  </p>


                  {
                    !(code === null)
                      ?
                      <OutputCode lang={"javascript"} code={code} />
                      :
                      <></>
                  }

                  <div className="container mx-auto py-4 flex flex-row justify-center gap-x-7
                   rounded-xl my-6">

                    {resources && Object.entries(resources).map(([index, file]) => (

                      <div key={index} className="mb-4">

                        <div className="p-4 rounded-md flex items-center">
                          {file ? (
                            <>
                              <label>
                                <a href={file?.fileURL} target="_blank">
                                  <img className="w-24 h-24" src={PDF} alt="PDF Icon" />
                                </a>
 
                                {/* <FontAwesomeIcon icon={faFilePdf} className="text-red-500 mr-4 text-5xl" /> */}

                                <a href={file?.fileURL} target="_blank" rel="noopener noreferrer" 
                                className="hover:underline py-3 text-sm">{file?.filename}</a>

                                {/* <p className="text-gray-200 text-sm">{file?.filename}</p> */}
                              
                              </label>
                            </>
                          ) : (
                            <span className="text-gray-500">No file uploaded</span>
                          )}
                        </div>
                      </div>
                    ))}

                  </div>

                </div>
              )
            })
          }

          {/*       {
            blogState?.codelinks && blogState?.codelinks.length > 1
              ?
              <div className='mx-6 my-4'>
                <CodeLinks codeLinks={blogState?.codelinks} />
              </div>
              :
              <></>
          } */}

          {/* tags */}
          <div className='mx-6 md:mx-14 mb-4 mt-6'>
            <TagSection tagList={blogState?.tags} />
          </div>

          {/* claps and comment count */}
          <div className={`my-10 md:mx-6 border-2 border-l-0
       border-r-0  ${isDarkTheme ? 'border-gray-800' : 'border-gray-100'}`}>
            <BlogInteraction blogId={blogId} claps={blogState?.claps} commentsCount={commentsCnt}
              userId={userId} blog={blogState} />
          </div>


        </div>


        {/* blog navigation */}
        <div className='hidden md:block md:w-[25%] pl-4 mt-24'>
          <BlogNavigation navigation={blogState?.sectionTitles} />
        </div>

      </div>


      {/* comment section */}
      {/* unlock only when user is registered o/w locked section */}

      {
        !(userId === null) ?
          <div className='mx-4 md:mx-32 md:w-[65%]'>
            <CommentForm blogId={blogId} userId={userId} username={u_name} />
          </div>
          :
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white">
            <p className="text-lg mb-4">Login in to leave a comment.</p>
            <Link to={'/login'}>
              <button className="bg-slate-900 hover:scale-[97%] transition-all
             text-white px-5 py-3 rounded-md">
                Log In
              </button>
            </Link>

          </div>
      }


      <hr className="rounded-full shadow-md shadow-gray-500 my-8" />

      <div className='md:mx-[20%]' id="Starting with React">
        <CommentSection comments={comments} />
      </div>

      <hr className="rounded-full shadow-md shadow-gray-500 my-8" />

      <div id="Task-1">
        <AuthorDetails userId={userId} blog={blogState} followersCnt={followersCnt} />
      </div>

      <Footer />

    </div>
  )
}

export default Blog
