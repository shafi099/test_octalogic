const express = require('express');
const router = express.Router();
const { Vehicle, VehicleType } = require('../models');

router.get('/', async (req, res) => {
  try {
    const { category, vehicleTypeId } = req.query;

    // Filter vehicles based on category (bike/car) and vehicleTypeId
    const where = {};
    if (category) {
      where['$VehicleType.category$'] = category;
    }
    if (vehicleTypeId) {
      where['vehicleTypeId'] = vehicleTypeId;
    }

    const vehicles = await Vehicle.findAll({
      where,
      include: VehicleType
    });

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

router.get('/type', async (req, res) => {
  try {
    const { category } = req.query;

    const where = category ? { category: category } : {};

    const vehicleTypes = await VehicleType.findAll({where});
    res.json(vehicleTypes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

module.exports = router;