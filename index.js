const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI WeatherWise API operational' });
});

// Centralized Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});