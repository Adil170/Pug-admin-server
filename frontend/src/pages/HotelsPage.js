// pages/HotelsPage.js

import React, { useEffect, useState } from 'react';
import HotelForm from '../components/HotelForm';
import { getHotels } from '../api/HotelApi';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchHotelsData();
  }, []);

  const fetchHotelsData = async () => {
    try {
      const data = await getHotels();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleAddHotel = () => {
    setIsAdding(true);
  };

  const handleEditHotel = (hotel) => {
    // Implement edit functionality here
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div>
      <h1>Hotels</h1>
      {hotels.map((hotel) => (
        <div key={hotel._id}>
          <h2>{hotel.name}</h2>
          <p>{hotel.desc}</p>
          <button onClick={() => handleEditHotel(hotel)}>Edit</button>
        </div>
      ))}
      {isAdding ? (
        <HotelForm onSubmit={fetchHotelsData} onCancel={handleCancel} />
      ) : (
        <button onClick={handleAddHotel}>Add Hotel</button>
      )}
    </div>
  );
};

export default HotelsPage;
