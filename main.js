const express = require('express');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

// Initialize the app
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://itxinayat23:sGjWNrR840xzUwU3@smit.gle5x.mongodb.net/?retryWrites=true&w=majority&appName=Smit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    phoneNumber: String,
  });
  
  // Create a User model
  const User = mongoose.model('User', userSchema);
 

app.get('/api/users/random', async (req, res) => {
    const randomUser = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      phoneNumber: faker.phone.number(),
    });
  
    try {
      const savedUser = await randomUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ message: 'Error saving user', error: err });
    }
  });
  
  // Get all users
  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving users', error: err });
    }
  });
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
      