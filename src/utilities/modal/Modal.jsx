
import React from 'react';

const Modal = ({ isOpen, onClose, title, content="", blogTitle="", onConfirm }) => {
    return (
        <div className={`fixed inset-0 flex justify-center items-center my-[45vh] z-50 ${isOpen ? 'visible' : 'invisible'}`}>
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white p-6 rounded-md shadow-md z-10">
                <h2 className="text-lg font-semibold mb-4 text-slate-800">{title}</h2>
                <p className="text-sm text-gray-600 mb-4">{content}</p>
                { !(blogTitle==="")?
                <p className='bg-red-600 py-2 px-1 rounded-md text-white my-2'>Caution !! Critical Action</p>
                : <></>} 
                <p className="text-sm text-gray-600 mb-4">{blogTitle}</p>
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
