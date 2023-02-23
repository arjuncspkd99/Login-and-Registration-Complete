const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.static(path.resolve(__dirname, '../client/build')));

const User = mongoose.model('User', { email: String, password: String });

      app.post('/api/register', (req, res) => {
        const { email, password } = req.body;
      
        User.findOne({ email }, (err, user) => {
          if (err) {
            console.error('Error finding user in database:', err);
            return res.status(500).json({ error: 'Server error' });
          }
          if (user) {
            // If the user already exists, return an error response with a message
            return res.status(409).json({ error: 'User already exists' });
          }
      
          const newUser = new User({ email, password });
          newUser.save((err) => {
            if (err) {
              console.error('Error inserting data into MongoDB:', err);
              return res.status(500).json({ error: 'Server error' });
            }
      
            console.log('Data was inserted into MongoDB:', newUser);
            res.json({ message: 'Data was inserted into MongoDB' });
          });
        });
      });

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password }, (err, user) => {
    if (err) {
      console.error('Error finding user in database:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Logged in successfully' });
    
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});