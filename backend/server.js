const express = require('express')
const app = express()
const port = 5000
const mongoose = require("mongoose")
const register = require("./routes/register");
const login = require("./routes/login");
const productsRoute = require("./routes/products");
const hotelRouter = require('./routes/hotelRoutes')
const orders = require("./routes/orders");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");
app.use(logger('dev'));   
app.use(express.json());
app.use(cookieParser())   
app.use(cors());
 dotenv.config();


mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  console.log("mongo db is connected")
})
.catch((err) => {    
  console.error(err)
})
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/products",productsRoute)  
app.use("/api", hotelRouter) 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})