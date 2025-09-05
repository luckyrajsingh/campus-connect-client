import React, { useState, useEffect } from 'react';
import api from '../api/api'; // 👈 Use our central API client
import ItemCard from '../components/ItemCard';
import SearchBox from '../components/SearchBox';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        // Append the search query to the URL
        const res = await api.get(`/items?search=${searchKeyword}`);
        setItems(res.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
        alert('Could not fetch items.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [searchKeyword]); // Refetch when searchKeyword changes

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  if (loading) {
    return <h2 className="text-center mt-8">Loading items...</h2>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Latest Lost & Found Items
      </h1>

      {/* Add the SearchBox component */}
      <SearchBox onSearch={handleSearch} />

      <div className="flex flex-wrap justify-center">
        {items.length > 0 ? (
          // Use the ItemCard component for a cleaner layout
          items.map((item) => <ItemCard key={item._id} item={item} />)
        ) : (
          <p className="text-center text-gray-500">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

