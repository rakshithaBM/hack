import React from 'react';

const Rehabilitation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Rehabilitation Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Physical Therapy</h2>
          <p className="text-gray-600 mb-4">
            Comprehensive physical therapy programs designed to help patients recover from injuries,
            surgeries, and chronic conditions.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Learn More
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Occupational Therapy</h2>
          <p className="text-gray-600 mb-4">
            Specialized programs to help patients regain independence in daily activities and improve
            quality of life.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Learn More
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Speech Therapy</h2>
          <p className="text-gray-600 mb-4">
            Expert speech and language therapy services for patients recovering from stroke, injury,
            or other conditions.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rehabilitation;