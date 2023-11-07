const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

//Connecton to Database
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('connection is established to the database');
});

mongoose.connect(uri, {
  useNewUrlParser: true,  
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//Middlewares
app.use(express.json());
app.use(cors());

// Import Routes
const authRoute = require('./routes/auth');

//Routes Middleware
app.use('/api/v1/user', authRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
