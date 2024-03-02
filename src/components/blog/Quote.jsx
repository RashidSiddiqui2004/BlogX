import React from 'react';

const Quote = ({ text }) => {
    return (
        <div className='my-8'>
            <p className="border-[3px] border-r-0 border-y-0 border-x-white text-lg pl-3 sm:px-2 sm:text-lg text-gray-100 text-justify my-1">
                <span className='italic'>{text}</span>
            </p>
        </div>
    );
};

export default Quote;
