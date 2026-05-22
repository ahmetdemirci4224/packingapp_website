import React from 'react';

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-200 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-600">{description}</p>
        <div className="mt-8 text-[#1e3a8a]">
           <svg className="w-16 h-16 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
        </div>
        <p className="text-sm text-gray-400 mt-4">Bu sayfa yapım aşamasındadır.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;