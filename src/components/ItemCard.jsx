import React from 'react';

const ItemCard = ({ item }) => {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={cardStyle}>
      <h3>{item.itemName}</h3>
      <p>
        <strong>Status:</strong>{' '}
        <span style={{ color: item.status === 'found' ? 'green' : 'red' }}>
          {item.status}
        </span>
      </p>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p>{item.description}</p>
      <hr />
      {item.user && (
        <p>
          <em>Posted by: {item.user.name} ({item.user.collegeId})</em>
        </p>
      )}
      <p><small>Posted on: {new Date(item.createdAt).toLocaleDateString()}</small></p>
    </div>
  );
};

export default ItemCard;
