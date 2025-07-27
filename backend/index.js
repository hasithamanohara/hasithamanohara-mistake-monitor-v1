const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/mistakes', require('./routes/mistakeRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Seed admin if not exists
const User = require('./models/User');
const bcrypt = require('bcryptjs');
(async () => {
  const admin = await User.findOne({ username: 'admin' });
  if (!admin) {
    await User.create({ username: 'admin', password:'admin123', role: 'admin' });
    console.log('Admin seeded');
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));