import React from 'react';

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 w-full max-w-sm">
      {/* Image Section */}
      <img
        src={item.imageUrl || 'https://placehold.co/400x300/e2e8f0/cbd5e0?text=No+Image'}
        alt={item.itemName}
        className="w-full h-48 object-cover"
      />

      {/* Content Section */}
      <div className="p-5">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
            item.status === 'found'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>

        <h3 className="text-xl font-bold text-gray-800 truncate" title={item.itemName}>
          {item.itemName}
        </h3>
        
        <p className="text-gray-600 text-sm mt-1 h-10 overflow-hidden">
          {item.description}
        </p>

        <div className="mt-4 text-sm text-gray-500">
          <p className="flex items-center mb-1">
            <span className="font-semibold mr-2">📍 Location:</span> {item.location}
          </p>
          <p className="flex items-center">
             <span className="font-semibold mr-2">👤 Reporter:</span> {item.user.name}
          </p>
        </div>
      </div>
       <div className="px-5 py-3 bg-gray-50 text-xs text-gray-400">
            Reported on {new Date(item.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ItemCard;