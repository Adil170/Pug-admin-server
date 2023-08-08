// api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Replace this with your actual backend server URL

export const getHotels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/hotels`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching hotels');
  }
};

export const addHotel = async (hotelData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-hotel`, hotelData);
    return response.data;
  } catch (error) {
    throw new Error('Error adding hotel');
  }
};

export const updateHotel = async (hotelId, hotelData) => {
  try {
    const response = await axios.put(`${BASE_URL}/hotels/${hotelId}`, hotelData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating hotel');
  }
};
