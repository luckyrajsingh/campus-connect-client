    import React, { useState } from 'react';

    const SearchBox = ({ onSearch }) => {
      const [keyword, setKeyword] = useState('');

      const submitHandler = (e) => {
        e.preventDefault();
        onSearch(keyword); // Pass the keyword to the parent component
      };

      return (
        <form onSubmit={submitHandler} className="flex justify-center mb-6">
          <input
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Items..."
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700">
            Search
          </button>
        </form>
      );
    };

    export default SearchBox;
    
