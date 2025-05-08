const express = require('express');
const router = express.Router();
const { Booking } = require('../models');
const { Op } = require('sequelize');

router.post('/', async (req, res) => {
  const { user, vehicleId, startTime, endTime } = req.body;

  try {
    const overlapping = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          {
            startTime: { [Op.lt]: new Date(endTime) },
            endTime: { [Op.gt]: new Date(startTime) }
          }
        ]
      }
    });

    if (overlapping) {
      return res.status(400).json({ message: 'Booking conflict detected!' });
    }

    const booking = await Booking.create({
      user,
      vehicleId,
      startTime,
      endTime
    });

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed', details: err.message });
  }
});

module.exports = router;
