// app/register/page.js
'use client';

import { useState } from 'react';

export default function RegisterClub() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [admins, setAdmins] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [clubId, setClubId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert admins to an array
    const adminsArray = admins.split(',').map(email => email.trim());

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('admins', JSON.stringify(adminsArray));
    if (image) formData.append('image', image);

    try {
      const response = await fetch('/api/registerClub', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setSuccessMessage('');
        setClubId('');
      } else {
        setSuccessMessage('Club registered successfully!');
        setClubId(data.club._id); // Set the club ID
        setError('');
      }
    } catch (error) {
      setError('Failed to register club');
      setSuccessMessage('');
      setClubId('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register Club</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Club Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows="4"
            required
          />
        </div>
        
        <div>
          <label htmlFor="admins" className="block text-sm font-medium text-gray-700">Admin Emails (comma separated)</label>
          <input
            type="text"
            id="admins"
            value={admins}
            onChange={(e) => setAdmins(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Club Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full"
          />
        </div>
        
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Register Club
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}
      {successMessage && (
        <div className="mt-4 text-green-500">
          <p>{successMessage}</p>
          {clubId && <p>Your club ID is: {clubId}</p>}
        </div>
      )}
    </div>
  );
}
