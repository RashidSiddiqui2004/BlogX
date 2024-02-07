
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
        // setCommentsCnt();
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


  return (
    <div style={{ color: mode === 'dark' ? 'white' : '' }}
      className='overflow-hidden'>

      <Navbar />

      <h1 className='text-4xl font-bold md:mx-[20%] mt-8 mb-6'>{blogState?.title}</h1>

      <div className='md:w-[55%] md:mx-[25%] my-4 py-5'>
        <BlogAuthorHighlights userId={userId} blog={blogState} blogId={blogId} commentsCount={commentsCnt} />
      </div>

      <div className='md:mx-[20%]'>
        <RenderHTMLContent htmlContent={blogState?.description} />
      </div>

      {/* tags */}
      <div className='mx-4 md:mx-[22%] mb-4 mt-6'>
        <TagSection tagList={blogState?.tags} />
      </div>

      {/* claps and comment count */}

      <div className={`md:ml-[25%] md:mr-[20%] my-10 border-2 border-l-0
       border-r-0  ${isDarkTheme ? 'border-gray-800' : 'border-gray-100'}`}>
        <BlogInteraction blogId={blogId} claps={blogState?.claps} commentsCount={commentsCnt}
          userId={userId} blog={blogState} />
      </div>

      {/* comment section */}
      {/* render only when user is registered o/w hide */}


      {
        !(userId === null) ?
          <div className='mx-4 md:mx-[20%]'>
            <CommentForm blogId={blogId} userId={userId} username={u_name} />
          </div>
          :
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white">
            <p className="text-lg mb-4">Please sign in to leave a comment.</p>
            <Link to={'/login'}>
              <button className="bg-blue-500 hover:bg-blue-600
             text-white px-4 py-2 rounded-md">
                Sign In
              </button>
            </Link>

          </div>
      }


      <hr className="rounded-full shadow-md shadow-gray-500 my-8" />

      <div className='md:mx-[20%]'>
        <CommentSection comments={comments} />
      </div>

      <div className={`${isDarkTheme ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <AuthorDetails userId={userId} blog={blogState} followersCnt={followersCnt} />
      </div>

      <Footer />

    </div>
  )
}

export default Blog



// const logout = () => {
//   localStorage.clear('user');
//   window.location.href = '/login'
// }

// logout();
