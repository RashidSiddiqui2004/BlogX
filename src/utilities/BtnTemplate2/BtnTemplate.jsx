
import React from 'react'

const BtnTemplate = ({ header, msg=""}) => {
    return (
        <div>
            <button 
                className={`rounded-full bg-slate-500 py-2 px-6 md:min-w-40
                 text-white shadow-md shadow-green-300 hover:scale-95 transition-all`}
            >
                {header} {msg}
            </button>
        </div>
    )
}

export default BtnTemplate