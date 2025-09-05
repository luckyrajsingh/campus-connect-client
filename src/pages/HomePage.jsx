// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Latest Lost & Found Items
      </h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No items have been reported yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-5 border hover:shadow-xl transition"
            >
              {/* If imageUrl exists */}
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}

              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="text-gray-500 text-xs">📍 {item.location}</p>
              <p className="text-gray-400 text-xs mt-1">
                Reported on {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
