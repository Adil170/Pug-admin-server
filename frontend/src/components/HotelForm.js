import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select, Option } from "@material-tailwind/react";
import axios from 'axios';

const AdminPanel = () => {
  const [hotels, setHotels] = useState([]);
  const [hotelName, setHotelName] = useState('');
  const [hotelImage, setHotelImage] = useState('');
  const [hotelDesc, setHotelDesc] = useState('');
  const [hotelId, setHotelId] = useState(''); // Define hotelId state
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemSizes, setItemSizes] = useState('');
  const [itemDesc, setItemDesc] = useState('');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hotels');
     
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleAddHotel = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/add-hotel', {
        name: hotelName,
        image: hotelImage,
        desc: hotelDesc,
      });
      alert("your hotel is added")
      console.log('Hotel added:', response.data);
      fetchHotels();
      setHotelName('')
      setHotelImage('')
      setHotelDesc('')
    
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  const handleAddItem = async () => { // Remove parameter, use hotelId state
    try {
      const response = await axios.post(`http://localhost:5000/api/add-item/${hotelId}`, {
        name: itemName,
        image: itemImage,
        price: itemPrice,
        sizes: itemSizes.split(','),
        desc: itemDesc,
      });
      console.log('Item added:', response.data);
     alert("item added successfully in Hotel")
      fetchHotels();
      setItemName('');
      setItemImage('');
      setItemPrice(0);
      setItemSizes('');
      setItemDesc('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="flex justify-center mt-9 bg-slate-200">
    <div className="mt-8 p-4 border rounded-md">
      <div>
        <h3 className=" flex justify-start text-3xl font-semibold mb-4">Add Hotels</h3>
        <input
          type="text"
          placeholder="Hotel Name"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          className="w-3/4 border rounded-md p-2 focus:outline-none focus:border-blue-400"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={hotelImage}
          onChange={(e) => setHotelImage(e.target.value)}
          className="w-3/4 border rounded-md p-2 focus:outline-none focus:border-blue-400"
        />
        <textarea
          placeholder="Description"
          value={hotelDesc}
          onChange={(e) => setHotelDesc(e.target.value)}
        />
        <button onClick={handleAddHotel} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Hotel</button>
      </div>
      
      {/* Add Item Form */}
      {/* Add Item Form */}
<div>
  <h3 className=" flex justify-start text-2xl font-semibold mb-4">Add Item to Hotel</h3>
  <select onChange={(e) => setHotelId(e.target.value)} className='w-[30%] rounded-md border-2 m-3 h-10'>
    <option>Select a hotel</option>
    {hotels.map((hotel) => (
      <option key={hotel._id} value={hotel._id}>
        {hotel.name}
      </option>
    ))}
  </select>

  {/* Inputs for adding item */}
  <input
    type="text"
    placeholder="Item Name"
    value={itemName}
    onChange={(e) => setItemName(e.target.value)}
    className="w-3/4 border rounded-md p-2 mb-2 focus:outline-none focus:border-blue-400"
  />
  <input
    type="text"
    placeholder="Item Image URL"
    value={itemImage}
    onChange={(e) => setItemImage(e.target.value)}
    className="w-3/4 border rounded-md p-2 mb-2 focus:outline-none focus:border-blue-400"
  />
  <input
    type="number"
    placeholder="Item Price"
    value={itemPrice}
    onChange={(e) => setItemPrice(e.target.value)}
    className="w-3/4 border rounded-md p-2 mb-2 focus:outline-none focus:border-blue-400"
  />
  <input
    type="text"
    placeholder="Item Sizes (comma-separated)"
    value={itemSizes}
    onChange={(e) => setItemSizes(e.target.value)}
    className="w-3/4 border rounded-md p-2 mb-2 focus:outline-none focus:border-blue-400"
  />
  <textarea
    placeholder="Item Description"
    value={itemDesc}
    onChange={(e) => setItemDesc(e.target.value)}
    className="w-3/4 border rounded-md p-2 mb-2 focus:outline-none focus:border-blue-400"
  />

  <button
    onClick={handleAddItem}
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
  >
    Add Item
  </button>
</div>


      {/* List of Hotels */}
      <div className='mt-14'>
        <h3>List of Hotels</h3>
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel._id}>
              {hotel.name} - <Link to={`/items/${hotel._id}`}>View Items</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default AdminPanel;
