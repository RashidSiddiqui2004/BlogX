import React from "react";

const Card = ({ title, description, image }) => {
  return (
    <div className="max-w-xs rounded md:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl">
      <div className="h-[80%]">
        <img className="w-full h-[70%] md:h-[90%] bg-contain" src={image} alt="Card" />
      </div>
      <div className="px-6 md:py-4 py-0">
        <div className="md:text-xl text-xs mt-0 text-left font-normal">{title}</div> 
      </div>
    </div>
  );
};

export default Card;