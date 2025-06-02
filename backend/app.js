const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');



const authRoutes = require('./routes/authRoutes');
const pdfRoutes = require('./routes/pdfRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Log all requests first
app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'frontend', 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'frontend', 'public', 'index.html'));
});


// API routes
app.use('/api/auth', authRoutes);
app.use('/api/pdf', pdfRoutes);

module.exports = app;
