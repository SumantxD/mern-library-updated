const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const bookRoutes = require('./routes/books')
const userRoutes = require('./routes/users')
const port = process.env.PORT || 5000
mongoose.set('strictQuery', false);

//express app
const app = express()


//middlewares
app.use(express.json())
app.use(cors())
app.use((req, res, next) =>{
   console.log(req.path, req.method);
   next()
})

//routes
   //book routes
app.use('/books',bookRoutes)
   //user routes
app.use('/user',userRoutes)
   //the final rutes will be /user/login && /user/signup

//connect to the DB

mongoose.connect(process.env.MONGO_URI)
   .then(() => {
      //listen for requests
      app.listen(port , ()=> console.log('> Connected to DB and listening to port ' + port))
   })
   .catch((error) => {
      console.log(error)
   })



