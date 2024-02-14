import React from 'react';

const BlogNavigation = ({ navigation }) => {
  return (
    <div className="p-5 rounded-md text-start bg-slate-950 bg-opacity-5">
      <h2 className="text-white text-lg font-semibold mb-4">In this blog </h2>
      <ul className='border-2 border-l-slate-400 px-5 rounded-lg
       border-r-0 border-t-0 border-b-0'>
        {navigation.map((name, index) => (
          <li key={index} className="mb-2">
            <a href={`#${name}`} className="text-slate-300 hover:text-green-300 transition-all" onClick={() => smoothScroll(name)}>
              - {name}
            </a>
          </li>
        ))}
      </ul>
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