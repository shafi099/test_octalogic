const express = require('express');
const cors = require('cors'); 
const app = express();
const { sequelize } = require('./models');

app.use(cors());
app.use(express.json());

const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/vehicles', vehicleRoutes);
app.use('/book', bookingRoutes);

const PORT = 4200;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected');
});
