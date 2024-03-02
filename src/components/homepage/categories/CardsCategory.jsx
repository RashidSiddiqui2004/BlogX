import React from "react";

const Card = ({ title, image }) => {
  return (
    <div className="max-w-xs rounded-lg shadow-lg min-h-40 hover:shadow-2xl">
      <div className="aspect-w-16 aspect-h-9">
        <img className="w-full h-full object-cover" src={image} alt="Card" />
      </div>
      <div className="px-4 py-3">
        <div className="text-lg font-extrabold">{title}</div>
      </div>
    </div>
  );
};

export default Card;
