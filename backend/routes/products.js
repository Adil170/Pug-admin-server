const Product = require('../models/productModel')
const express = require('express')
const router = express.Router();

router.post('/' , async(req , res ) => {
  const { name, colors, sizes } = req.body;

  try {
    const newProduct = new Product({ name, colors, sizes });
    await newProduct.save();

    res.status(201).json({ message: 'Product data saved successfully' });
  } catch (error) {
    console.error('Error saving product data:', error);
    res.status(500).json({ error: 'An error occurred while saving product data' });
  }
})

router.get('/' , async(req ,res) => {
  try{
     const getProducts =  await Product.find()
    
     res.status(200).json(getProducts)
  }
  catch(error){
  console.error(error)
  res.status(400).json({error : "An error occer while geting data"})
  }
})
module.exports = router



