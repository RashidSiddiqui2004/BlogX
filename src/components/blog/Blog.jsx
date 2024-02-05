
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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

const Blog = () => {

  const context = useContext(myContext);
  const { mode, getBlogData, getFollowersCount } = context;

  const params = useParams();
  const blogId = params.id;
  const [followersCnt, setfollowersCnt] = useState(0);

  const [blogState, setblogState] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      await getBlogData(blogId).then((data) => setblogState(data))
      await getFollowersCount(blogState?.authorId).then((data) => {setfollowersCnt(data)});  
    }

    fetchData();
  }, []);


  return (
    <div style={{ color: mode === 'dark' ? 'white' : '' }}
      className='overflow-hidden'>

      <Navbar />

      <h1 className='text-4xl font-bold md:mx-[20%] mt-8 mb-6'>{blogState?.title}</h1>
 
      <div className='w-[55%] md:mx-[25%] my-4 py-5'>
        <BlogAuthorHighlights claps={blogState?.claps} commentsCount={1}
          authorID={blogState?.authorId} authorName={blogState?.author}
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
        <BlogInteraction claps={blogState?.claps} commentsCount={1} blogUrl={blogId} />
      </div>


      {/* comment section */}
      <div className='mx-4 md:mx-[20%]'>
        <CommentForm blogId={blogId}/>
      </div>

      <hr class="rounded-full shadow-md shadow-gray-500 my-8" />

      <div className='md:mx-[20%]'>
        <CommentSection blogId={blogId} />
      </div>

      <div className='bg-slate-400'> 
        <AuthorDetails authorName={blogState?.author} followersCnt={followersCnt}/>
      </div>

      <Footer/>

    </div>
  )
}

export default Blog

