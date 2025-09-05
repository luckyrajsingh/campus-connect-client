import React, { useState } from 'react';
import api from '../api/api';

const PostItemPage = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    type: 'lost',
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = '';

    // Upload image first (if selected)
    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      try {
        const res = await api.post('/upload', uploadData);
        imageUrl = res.data.imageUrl;
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Image upload failed.');
        setUploading(false);
        return;
      }
    }

    // Submit item details with imageUrl
    const finalPostData = {
      ...formData,
      imageUrl,
    };

    try {
      await api.post('/items', finalPostData);
      alert('Item posted successfully!');
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to post item:', error);
      alert('Failed to post item.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '0 2rem' }}>
      <h1>Report a Lost or Found Item</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Item Name: </label>
          <input type="text" name="itemName" value={formData.itemName} onChange={onChange} required />
        </div>

        <div>
          <label>Description: </label>
          <textarea name="description" value={formData.description} onChange={onChange} required />
        </div>

        <div>
          <label>Location: </label>
          <input type="text" name="location" value={formData.location} onChange={onChange} required />
        </div>

        <div>
          <label>Type: </label>
          <select name="type" value={formData.type} onChange={onChange}>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

        {/* 👇 File input here */}
        <div>
          <label>Upload Image: </label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <br />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default PostItemPage;
