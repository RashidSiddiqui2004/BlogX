import React from 'react';
import { Link } from 'react-router-dom';
import image404 from './404.jpg'

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl md:text-6xl font-bold text-center text-gray-200 mb-4">Oops!</h1>
      <h2 className="text-lg md:text-2xl font-semibold text-center text-gray-200 mb-6">We couldn't find the page you're looking for.</h2>
      <p className="text-center text-gray-300 mb-8">The page you requested may have been removed or doesn't exist. You can go back to the <Link to="/" className="text-green-400 font-semibold italic hover:underline">homepage</Link> or try searching for what you're looking for.</p>
      <img src={image404} alt="404" className="w-64 md:w-96" />
    </div>
  );
};

export default NoPage;
