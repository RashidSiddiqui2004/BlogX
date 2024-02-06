
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
  const { mode, getBlogData, getFollowersCount } = context;

  const params = useParams();
  const blogId = params.id;
  const [followersCnt, setfollowersCnt] = useState(0);

  const [blogState, setblogState] = useState('');


  // const logout = () => {
  //   localStorage.clear('user');
  //   window.location.href = '/login'
  // }

  // logout();

  const [u_name, setUser] = useState('');
  const [userId, setUserId] = useState(null);

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
      await getBlogData(blogId).then((data) => setblogState(data))
      await getFollowersCount(blogState?.authorId).then((data) => { setfollowersCnt(data) });
    }

    fetchBlogData();
    fetchUserData();
  }, []);


  return (
    <div style={{ color: mode === 'dark' ? 'white' : '' }}
      className='overflow-hidden'>

      <Navbar />

      <h1 className='text-4xl font-bold md:mx-[20%] mt-8 mb-6'>{blogState?.title}</h1>

      <div className='w-[55%] md:mx-[25%] my-4 py-5'>
        <BlogAuthorHighlights claps={blogState?.clapCount} commentsCount={1} userId={userId}
          authorID={blogState?.authorId} authorName={blogState?.author} blogId={blogId}
          minutesRead={blogState?.minutesRead} publishDate={blogState?.date} />
      </div>

      <div className='md:mx-[20%]'>
        <RenderHTMLContent htmlContent={blogState?.description} />
      </div>

      {/* tags */}
      <div className='mx-4 md:mx-[22%] mb-4'>
        <TagSection tagList={blogState?.tags} />
      </div>

      {/* claps and comment count */}
      <div className='md:mx-[22%] my-10'>
        <BlogInteraction claps={blogState?.clapCount} commentsCount={1} blogId={blogId} />
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


      <hr class="rounded-full shadow-md shadow-gray-500 my-8" />

      <div className='md:mx-[20%]'>
        <CommentSection blogId={blogId} />
      </div>

      <div className='bg-slate-400'>
        <AuthorDetails userId={userId} authorID={blogState?.authorID} authorName={blogState?.author} followersCnt={followersCnt} />
      </div>

      <Footer />

    </div>
  )
}

export default Blog

