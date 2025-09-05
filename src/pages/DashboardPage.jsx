import React, { useState, useEffect } from 'react';
import api from '../api/api'; // Our central API client
import ItemCard from '../components/ItemCard'; // We can reuse the item card

const DashboardPage = () => {
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch the user's items
  const fetchMyItems = async () => {
    try {
      // We will create this backend route next.
      // For now, we fetch all and filter.
      const res = await api.get('/items');
      // A proper implementation would have a dedicated backend route
      // but for simplicity, we can filter on the client.
      // Note: This is inefficient for large datasets.
      const allItems = res.data;
      const userInfo = JSON.parse(atob(localStorage.getItem('userToken').split('.')[1]));
      const userItems = allItems.filter(item => item.user._id === userInfo.id);

      setMyItems(userItems);
    } catch (err) {
      setError('Failed to fetch your items.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  // Function to handle deleting an item
  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/items/${itemId}`);
        alert('Item deleted successfully.');
        // Refresh the list after deleting
        fetchMyItems();
      } catch (err) {
        alert('Failed to delete item.');
        console.error(err);
      }
    }
  };

  // Function to mark an item as resolved
  const handleMarkAsResolved = async (itemId) => {
    try {
      await api.put(`/items/${itemId}`, { isResolved: true });
      alert('Item marked as resolved.');
      fetchMyItems(); // Refresh list
    } catch (err) {
      alert('Failed to update item.');
      console.error(err);
    }
  };


  if (loading) return <p className="text-center">Loading your posts...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Dashboard</h1>
      <div className="flex flex-wrap justify-center">
        {myItems.length > 0 ? (
          myItems.map((item) => (
            <div key={item._id} className="relative">
              <ItemCard item={item} />
              <div className="flex justify-around p-2 bg-gray-100 rounded-b-lg">
                <button
                  onClick={() => handleMarkAsResolved(item._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                  disabled={item.isResolved}
                >
                  {item.isResolved ? 'Resolved' : 'Mark as Resolved'}
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">You have not posted any items yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
