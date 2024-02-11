import React from 'react' 

const CodeLinks = ({ codeLinks }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-left px-8">
      <h3 className="text-lg font-semibold mb-2">Code Links:</h3>
      <ul className='text-left'>
        {codeLinks?.map((link, index) => (
          <li key={index} className="mb-2">
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeLinks;
