// HotelItems.js

import React, { useState, useEffect } from 'react';
import { useParams ,Link} from 'react-router-dom';
import axios from 'axios';


const HotelItems = () => {
  const { hotelId } = useParams(); // Get hotelId from URL parameter
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchHotelItems();
  }, [hotelId]); // Fetch items whenever hotelId changes

  const fetchHotelItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  const handleDeleteItem = async (itemId) => {
    try {
        axios.delete(`http://localhost:5000/api/items/${itemId}`);
      fetchHotelItems(); // Refresh the items after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  return (
    <>
    <div>
        <h2 className='flex justify-center text text-3xl mt-4'>Items for Hotel</h2>
    </div>
    <div className="flex justify-center mt-5 border-2 rounded-md">
        
      
      <ul >
        {items.map((item) => (
          <li key={item._id} className=' flex justify-around m-3 border-2 p-2 rounded-md'>
            {item.name} --- Price: ${item.price}
            <button  onClick={handleDeleteItem} className='bg-black rounded-md text-white p-2 m-4'>Delete</button>
            <Link to={`/edit-item/${item._id}`} className='bg-black rounded-md text-white p-2 m-3'>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default HotelItems;
