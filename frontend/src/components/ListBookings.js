import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { environment } from '../environment';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);

    useEffect(() => {
    //   console.log(`${environment.api}/book`)
    fetch(`${environment.basePath}/book`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error('Failed to fetch bookings', err));
  }, []);

  return (
    <TableContainer component={Paper} className="mt-6">
      <Typography variant="h6" className="px-4 py-2">All Bookings</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Vehicle ID</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell size="medium">{booking?.firstName || 'N/A'} {booking?.lastName}</TableCell>
              <TableCell size="medium">{booking.Vehicle?.name}</TableCell>
              <TableCell size="medium">{new Date(booking.startTime).toLocaleString()}</TableCell>
              <TableCell size="medium">{new Date(booking.endTime).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingsList;
