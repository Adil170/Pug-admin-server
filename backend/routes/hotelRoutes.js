// routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const hotelController = require('../controller/hotelController');

// get all hotels and items
        
router.post('/add-hotel', hotelController.addHotel);
router.put('/hotels/:hotelId', hotelController.updateHotel);

// // // Get all hotels
router.get('/hotels', hotelController.getAllHotels);

// // // Get all items
router.get('/items', hotelController.getAllItems);

// // // Add items Using Hotel ID

router.post('/add-item/:hotelId', hotelController.addItemToHotel);

// Update a hotel by its ID
router.put('/update-hotel/:hotelId', hotelController.updateHotel);

// Update an item in a hotel
router.put('/update-item/:hotelId/:itemId', hotelController.updateItem);


// Delete a hotel by its ID
router.delete('/hotels/:hotelId', hotelController.deleteHotel);


module.exports = router;
