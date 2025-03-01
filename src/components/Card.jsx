// src/components/Card.jsx
import React from 'react';

const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 transition-all hover:shadow-lg">
      <div className="flex items-center mb-2">
        <div className="bg-gray-100 p-2 rounded-lg mr-3">
          {icon}
        </div>
        <h3 className="text-sm sm:text-base font-medium text-gray-600">{title}</h3>
      </div>
      <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">{value.toLocaleString()}</p>
    </div>
  );
};

export default Card;