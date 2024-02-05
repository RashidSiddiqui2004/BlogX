<<<<<<< HEAD
import React from 'react'
import TrendingBlogs from '../homepage/trending/Trending'
=======
import React, { useContext } from 'react'
import Navbar from '../homepage/navbar/Navbar'
import BlogAuthorHighlights from './blogAuthorHighlights/BlogAuthorHighlights'
import RenderHTMLContent from '../../utilities/htmlRenderer/RenderHTMLContent'
import myContext from '../../context/data/myContext'
import CommentForm from './comments/CommentForm'
import TagSection from './tags/TagSection'
import BlogInteraction from './interaction/BlogInteraction'
import CommentSection from './comments/CommentSection'

>>>>>>> 4a8c488eaf2bf4db6e5c9f02c6f100d494146f9d
const Blog = () => {

  const context = useContext(myContext);
  const { mode } = context;

  const title = "UX/UI Design Trends Going Into 2024";

  const tagsOnBlog = ["Web Development", "UI/UX", "GitHub"];

  const blogContent = `<h1 style="text-align: center;"><strong><span style="font-family: 'comic sans ms', sans-serif;"><em><img src="https://www.mindinventory.com/blog/wp-content/uploads/2021/03/mobile-app-design-fundamentals-the-difference-between-UI-and-UX.webp" alt="UI/UX " width="800" height="505"></em></span></strong></h1><p style="text-align: center;"><strong><span style="font-family: 'comic sans ms', sans-serif; font-size: 18pt;"><em>NEW POST</em></span></strong></p><p style="text-align: center;">&nbsp;</p><p style="text-align: center;">&nbsp;</p><h1 id="2ae8" class="mn mo fr be mp mq mr gr ms mt mu gu mv mw mx my mz na nb nc nd ne nf ng nh ni bj" data-selectable-paragraph="">Visual Studio Code is one of the most widely-used source code editors out there, with over 136k stars on GitHub. Its popularity comes about due to its lightness, flexibility, open-source nature, simplicity, and extensibility.</h1><p id="f3f1" class="pw-post-body-paragraph nj nk fr nl b gp nm nn no gs np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe fk bj" data-selectable-paragraph="">Speaking of extensibility, VSCode has thousands of extensions you can install to ramp up your developer productivity and save yourself from mundane tasks. They are all available in the Visual Studio Code marketplace and the vast majority of them are completely free.</p><p class="pw-post-body-paragraph nj nk fr nl b gp nm nn no gs np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe fk bj" data-selectable-paragraph="">&nbsp;</p><p class="pw-post-body-paragraph nj nk fr nl b gp nm nn no gs np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe fk bj" data-selectable-paragraph="">&nbsp;</p><p class="pw-post-body-paragraph nj nk fr nl b gp nm nn no gs np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe fk bj" data-selectable-paragraph=""><img src="https://frameboxx.in/upload/page/what-are-the-opportunities-for-ui-ux-designers_165530x.jpg" alt="2nd Image for blog" width="800" height="451"></p><p class="pw-post-body-paragraph nj nk fr nl b gp nm nn no gs np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe fk bj" data-selectable-paragraph="">&nbsp;</p><p class="pw-post-body-paragraph nj nk fr nl b gp nm nn no gs np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe fk bj" data-selectable-paragraph="">&nbsp;</p><p class="pw-post-body-paragraph nj nk fr nl b gp nm nn no gs np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe fk bj" data-selectable-paragraph="">&nbsp;</p><h1 id="7363" class="mn mo fr be mp mq mr gr ms mt mu gu mv mw mx my mz na nb nc nd ne nf ng nh ni bj" data-selectable-paragraph="">2.&nbsp;<mark class="tt tu ao">JavaScript Booster</mark></h1><p>&nbsp;</p><p>&nbsp;</p><p id="ffdd" class="pw-post-body-paragraph nj nk fr nl b gp nm nn no gs np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe fk bj" data-selectable-paragraph="">This extension upgrades Visual Studio Code with code actions to perform common refactoring tasks that occur when programming with JavaScript.</p><p class="pw-post-body-paragraph nj nk fr nl b gp nm nn no gs np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe fk bj" data-selectable-paragraph="">&nbsp;</p><p class="pw-post-body-paragraph nj nk fr nl b gp nm nn no gs np nq nr ns nt nu nv nw nx ny nz oa ob oc od oe fk bj" data-selectable-paragraph="">&nbsp;</p>`;

  return (
<<<<<<< HEAD
    < div className=''>
    <div className='TrendingBlogs  overflow-hidden w-full'>
      <TrendingBlogs />
    </div>
=======
    <div style={{ color: mode === 'dark' ? 'white' : '' }}
      className=' overflow-hidden'>
      <Navbar />

      <h1 className='text-4xl font-bold my-4'>{title}</h1>

      <div className='w-[55%] md:mx-[25%] my-4 py-5'>
        <BlogAuthorHighlights claps={100} commentsCount={50} authorID={100}
          blogUrl={'gouhw70uyhf'} minutesRead={5} publishDate="" />
      </div>

      <div className='md:mx-[20%]'>
        <RenderHTMLContent htmlContent={blogContent} />
      </div>

      {/* tags */}
      <div className='mx-4 md:mx-[22%] mb-4'>
        <TagSection tagList={tagsOnBlog} />
      </div>

      {/* claps and comment count */}
      <div className='md:mx-[22%] my-10'>
        <BlogInteraction claps={100} commentsCount={50} blogUrl={'gouhw70uyhf'} />
      </div>


      {/* comment section */}
      <div className='mx-4 md:mx-[20%]'>
        <CommentForm />
      </div>

      <hr />

      <div className='md:mx-[20%]'>
        <CommentSection/>
      </div>

>>>>>>> 4a8c488eaf2bf4db6e5c9f02c6f100d494146f9d
    </div>
  )
}

export default Blog
