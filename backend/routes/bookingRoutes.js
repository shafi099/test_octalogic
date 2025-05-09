const express = require('express');
const router = express.Router();
const { Booking, Vehicle, VehicleType } = require('../models');

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: {
        model: Vehicle,
        include: {
          model: VehicleType
        }
      }
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, vehicleId, startTime, endTime } = req.body;

    const booking = await Booking.create({
      firstName,
      lastName,
      vehicleId,
      startTime,
      endTime
    });

    res.status(201).json({ message: 'Booking successful', bookings: booking });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed', details: err.message });
  }
});

module.exports = router;
