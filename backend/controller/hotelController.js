const  Hotel  = require('../models/hotel');
const  {item}  = require('../models/hotel');

// Add a new hotel with its items

// Add a new hotel with its items
exports.addHotel = async (req, res) => {
  try {
    const { name, image, desc, items } = req.body;

    // Create the hotel document
    const hotel = new Hotel({ name, image, desc, items });

    // Save the hotel with its items
    await hotel.save();

    res.status(201).json(hotel);
  } catch (err) {
    console.error('Error adding hotel:', err);
    res.status(500).json({ error: 'An error occurred while adding the hotel' });
  }
};


// Update an existing hotel by its ID
exports.updateHotel = async (req, res) => {
  try {
    const { name, image, desc, items } = req.body;
    const hotelId = req.params.hotelId;

    // Find the hotel by its ID
    const hotel = await Hotel.findById(hotelId);

    // If the hotel is not found, return an error response
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Update the hotel data
    hotel.name = name;
    hotel.image = image;
    hotel.desc = desc;
    hotel.items = items;

    // Save the updated hotel
    await hotel.save();

    res.status(200).json(hotel);
  } catch (err) {
    console.error('Error updating hotel:', err);
    res.status(500).json({ error: 'An error occurred while updating the hotel' });
  }
};




// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    console.error('Error getting hotels:', err);
    res.status(500).json({ error: 'An error occurred while fetching hotels' });
  }
};


exports.getAllItems = async (req, res) => {
  try {
    const items = await Hotel.find().distinct('items'); // Use distinct() to get unique items across all hotels
    res.status(200).json(items);
  } catch (err) {
    console.error('Error getting items:', err);
    res.status(500).json({ error: 'An error occurred while fetching items' });
  }
};

// Get items for a specific hotel
exports.getItemsForHotel = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;

    // Find the hotel by its ID and populate the 'items' field
    const hotel = await Hotel.findById(hotelId).populate('items');

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.json(hotel.items);
  } catch (err) {
    console.error('Error getting items for hotel:', err);
    res.status(500).json({ error: 'An error occurred while fetching items for the hotel' });
  }
};


// Add an item to a hotel
exports.addItemToHotel = async (req, res) => {
  try {
    const { name, image, price, sizes, desc } = req.body;
    console.log(req.body);
    const hotelId = req.params.hotelId;

    // Find the hotel by ID
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Create the new item
    const newItem = { name, image, price, sizes, desc };

    // Add the new item to the hotel's 'items' array
    hotel.items.push(newItem);

    // Save the hotel with the updated 'items' array
    await hotel.save();

    res.status(201).json(hotel);
  } catch (err) {
    console.error('Error adding item:', err);
    res.status(500).json({ error: 'An error occurred while adding the item' });
  }
};



// Update a hotel by its ID
exports.updateHotel = async (req, res) => {
  try {
    const { name, image, desc } = req.body;
    const hotelId = req.params.hotelId;

    // Find the hotel by its ID
    const hotel = await Hotel.findById(hotelId);

    // If the hotel is not found, return an error response
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Update the hotel data
    hotel.name = name;
    hotel.image = image;
    hotel.desc = desc;

    // Save the updated hotel
    await hotel.save();

    res.status(200).json(hotel);
  } catch (err) {
    console.error('Error updating hotel:', err);
    res.status(500).json({ error: 'An error occurred while updating the hotel' });
  }
};

// Update an item in a hotel
exports.updateItem = async (req, res) => {
  try {
    const { name, image, price, sizes, desc } = req.body;
    const { hotelId, itemId } = req.params;

    // Find the hotel by its ID
    const hotel = await Hotel.findById(hotelId);

    // If the hotel is not found, return an error response
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Find the item by its ID in the hotel's items array
    const item = hotel.items.id(itemId);

    // If the item is not found, return an error response
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Update the item data
    item.name = name;
    item.image = image;
    item.price = price;
    item.sizes = sizes;
    item.desc = desc;

    // Save the hotel after updating the item
    await hotel.save();

    res.status(200).json(item);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ error: 'An error occurred while updating the item' });
  }
};




// Delete a hotel by its ID
exports.deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;

    // Find the hotel by its ID and remove it
    const deletedHotel = await Hotel.findByIdAndRemove(hotelId);

    // If the hotel is not found, return an error response
    if (!deletedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.status(200).json(deletedHotel);
  } catch (err) {
    console.error('Error deleting hotel:', err);
    res.status(500).json({ error: 'An error occurred while deleting the hotel' });
  }

};



// Delete an item by its ID
exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    // Find the hotel that contains the item
    const hotel = await Hotel.findOne({ 'items._id': itemId });

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel or item not found' });
    }

    // Filter out the item to be deleted from the items array
    hotel.items = hotel.items.filter((item) => item._id.toString() !== itemId);

    // Save the updated hotel document
    await hotel.save();

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'An error occurred while deleting the item' });
  }
};
