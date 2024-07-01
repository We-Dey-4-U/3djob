const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const cartRoutes = require('./routes/cartRoutes');
app.use('/api', cartRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});