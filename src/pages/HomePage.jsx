import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
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
        const res = await api.get(`/items?search=${searchKeyword}`);
        setItems(res.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [searchKeyword]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="bg-gray-800 text-white text-center py-24 px-6">
        <h1 className="text-5xl font-bold mb-4">Lost Something? Found Something?</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          The central hub for all lost and found items on campus. Let's help each other reconnect with our belongings.
        </p>
        <Link
          to="/post-item"
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 text-lg shadow-lg"
        >
          Report an Item
        </Link>
      </section>

      {/* 2. Main Content Section */}
      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Recent Listings</h2>
        <p className="text-center text-gray-500 mb-10">
          Browse the latest items reported by the campus community.
        </p>
        
        <SearchBox onSearch={handleSearch} />

        {loading ? (
          <p className="text-center text-gray-600 mt-10">Loading items...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            {items.length > 0 ? (
              items.map((item) => <ItemCard key={item._id} item={item} />)
            ) : (
              <div className="text-center bg-white p-12 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-semibold text-gray-700">No Items Found</h3>
                <p className="text-gray-500 mt-2">Try a different search or be the first to post a new item!</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 3. Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-16">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} CampusConnect. A College Project by Lucky Raj Singh.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;