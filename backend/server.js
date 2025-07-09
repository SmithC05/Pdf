// backend/server.js
require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const server = http.createServer(app);
    
    server.listen(PORT, async () => {
      console.log(`Server running on port ${PORT}`);
      console.log('✅ MongoDB connected successfully');
    });
    
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
