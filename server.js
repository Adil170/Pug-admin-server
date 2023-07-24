const express = require('express')
const app = express()
const port = 5000
const mongoose = require("mongoose")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");
const { error } = require('console');
const registerRouter = require("./routes/index")
dotenv.config(); 

app.use(logger('dev'));   
app.use(express.json());
app.use(cookieParser())
app.use('/user',registerRouter)


mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  console.log("mongo db is connected")
})
.catch((err) => {
  console.error(err)
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})