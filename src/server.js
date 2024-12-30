// Ortam değişkenlerini yükle
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const exampleRoutes = require('./routes/exampleRoutes');
const authRoutes = require('./routes/authRoutes');
const privateRoutes = require('./routes/privateRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/example', exampleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/uploads', express.static('uploads'));

// Basit bir rota
app.get('/', (req, res) => {
  res.send('Node.js backend is running! Updated');
});

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
