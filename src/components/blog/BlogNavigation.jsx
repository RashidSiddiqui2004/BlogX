import React, { useState, useEffect } from 'react';

const BlogNavigation = ({ navigation, blogheight }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateBar = () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    setScrollProgress(scrolled)

  };

  useEffect(() => {
    window.addEventListener('scroll', updateBar);

    return () => window.removeEventListener('scroll', updateBar)
  })

  return (
    <div className="py-5 rounded-md text-start bg-slate-950 bg-opacity-5 sticky top-16">
      <h2 className="text-white text-lg font-semibold mb-4">In this blog </h2>
      <ul className='border-[1px] border-l-slate-400 px-5
       border-r-0 border-t-0 border-b-0'>
        {navigation?.map((name, index) => {

          const isValidTitle = !(name === null);

          return isValidTitle && (
            <li key={index} className="my-6">
              <a href={`#${name}`} className="text-slate-100 hover:text-green-200 transition-all" onClick={() => smoothScroll(name)}>
                {name}
              </a>
            </li>
          )
        })}
      </ul>

      {/* <div className='mt-10 flex-col justify-center items-center'>
        <div className='flex justify-center items-center'>Till Bottom</div>
        <div className='border-t-2 border-white my-1'
        style={{width : `${scrollProgress}%`}}></div>
      </div> */}

      <div className='mt-10 flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center'>Reading Progress</div>
        <div className='w-full h-4 bg-gray-300 mt-1 relative rounded-full'>
          <div className='h-full bg-slate-100 rounded-full' style={{ width: `${scrollProgress}%` }}></div>
          <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <span className='text-xs text-gray-800 font-semibold py-2'>{Math.floor(scrollProgress) + 1}%</span>
          </div>
        </div>
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
