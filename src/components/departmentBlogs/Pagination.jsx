
import React from 'react';

import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const renderPageBlocks = () => {
        const blocks = [];
        for (let i = 1; i <= totalPages; i++) {
            blocks.push(
                <span
                    key={i}
                    className={`cursor-pointer mx-6
                     ${currentPage === i ? 'font-bold text-black bg-white px-4 py-2 rounded-lg' : 'text-white'
                        }`}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </span>
            );
        }
        return blocks;
    };

    return (
        <div className="flex justify-center items-center mt-4">

            {/* {currentPage > 1 && ( */}

            <div className='flex gap-1 font-bold'>
                <GoArrowLeft className='font-semibold mt-2 text-white' />
                <button
                    className="px-2 py-1  text-white mr-2 "
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

            </div>
            {/* )} */}

            {renderPageBlocks()}

            {/* {currentPage < totalPages && ( */}

            <div className='flex gap-1 font-bold'>
                <button
                    className="px-2 py-1 text-white ml-2"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <GoArrowRight className='font-semibold mt-2 text-white' />
            </div>
            {/* )} */}
        </div>
    );
};

export default Pagination;
