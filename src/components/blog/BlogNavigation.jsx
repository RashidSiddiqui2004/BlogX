import React, { useState, useEffect } from 'react';

const BlogNavigation = ({ navigation, blogheight }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

    const updateBar = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled)

    };

    useEffect (() => {
      window.addEventListener('scroll', updateBar);

    return () => window.removeEventListener('scroll', updateBar)
    })
 
  return (
    <div className="p-5 rounded-md text-start bg-slate-950 bg-opacity-5 sticky top-16">
      <h2 className="text-white text-lg font-semibold mb-4">In this blog </h2>
      <ul className='border-[1px] border-l-slate-400 px-5
       border-r-0 border-t-0 border-b-0'>
        {navigation?.map((name, index) => {
          
          const isValidTitle = !(name===null);

          return isValidTitle && (
          <li key={index} className="my-6">
            <a href={`#${name}`} className="text-slate-200 hover:text-green-200 transition-all" onClick={() => smoothScroll(name)}>
              {name}
            </a>
          </li>
        )
        })}
      </ul>

      <div className='mt-10 flex-col justify-center items-center'>
        <div className='flex justify-center items-center'>Till Bottom</div>
        <div className='border-t-2 border-white'
        style={{width : `${scrollProgress}%`}}></div>
      </div>
    </div>
  );
};

export default BlogNavigation;


function smoothScroll(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
