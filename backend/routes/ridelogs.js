// Import Express and database connection pool
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assumes db/index.js exports a configured pg Pool

// GET /api/ridelogs
// Fetch all ride log records
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ride_logs ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching ride logs:', err);
    res.status(500).send('Server error');
  }
});

// POST /api/ridelogs
// Create a new ride (initially inactive, no driver or taxi assigned)
router.post('/', async (req, res) => {
  const { pickup, dropoff, start_datetime, end_datetime } = req.body;
  try {
    const sql = `
      INSERT INTO ride_logs (pickup, dropoff, start_datetime, end_datetime)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [pickup, dropoff, start_datetime, end_datetime];
    const result = await pool.query(sql, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating ride log:', err);
    res.status(500).send('Server error');
  }
});


// PATCH /api/ridelogs/:id/assign-driver
// Assign an inactive driver to a ride and set driver & ride status to active
router.patch('/:id/assign-driver', async (req, res) => {
  const rideId = req.params.id;
  const { driver_id } = req.body;

  try {
    await pool.query('BEGIN');

    // Get current driver assigned to the ride
    const { rows } = await pool.query(
      'SELECT driver_id FROM ride_logs WHERE id = $1',
      [rideId]
    );
    const currentDriverId = rows[0]?.driver_id;

    // If there's a different driver already assigned, set them to inactive
    if (currentDriverId && currentDriverId !== driver_id) {
      await pool.query(
        'UPDATE drivers SET status = \'inactive\' WHERE id = $1',
        [currentDriverId]
      );
    }

    // Assign new driver and mark as active
    await pool.query(
      'UPDATE ride_logs SET driver_id = $1  WHERE id = $2',
      [driver_id, rideId]
    );
    await pool.query(
      'UPDATE drivers SET status = \'active\' WHERE id = $1',
      [driver_id]
    );

    await pool.query('COMMIT');
    res.sendStatus(200);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error assigning driver:', err);
    res.status(500).send('Server error');
  }
});


// Remove Assigned drivers to rides.
// PATCH /api/ridelogs/:id/remove-driver
router.patch('/:id/remove-driver', async (req, res) => {
  const rideId = req.params.id;

  try {
    await pool.query('BEGIN');

    // Get current driver assigned to the ride
    const { rows } = await pool.query('SELECT driver_id FROM ride_logs WHERE id = $1', [rideId]);
    const currentDriverId = rows[0]?.driver_id;

    if (currentDriverId) {
      // Set driver to inactive
      await pool.query('UPDATE drivers SET status = \'inactive\' WHERE id = $1', [currentDriverId]);
    }

    // Remove driver from ride
    await pool.query('UPDATE ride_logs SET driver_id = NULL WHERE id = $1', [rideId]);

    await pool.query('COMMIT');
    res.sendStatus(200);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error removing driver:', err);
    res.status(500).send('Server error');
  }
});



// PATCH /api/ridelogs/:id/assign-taxi
// Assign an inactive taxi to a ride and set taxi status to active
router.patch('/:id/assign-taxi', async (req, res) => {
  const rideId = req.params.id;
  const { taxi_id } = req.body;

  try {
    await pool.query('BEGIN');

    // Get current taxi assigned to the ride
    const { rows } = await pool.query(
      'SELECT taxi_id FROM ride_logs WHERE id = $1',
      [rideId]
    );
    const currentTaxiId = rows[0]?.taxi_id;

    // If there's a different taxi already assigned, set it to inactive
    if (currentTaxiId && currentTaxiId !== taxi_id) {
      await pool.query(
        'UPDATE taxis SET status = \'inactive\' WHERE id = $1',
        [currentTaxiId]
      );
    }

    // Assign new taxi and mark as active
    await pool.query(
      'UPDATE ride_logs SET taxi_id = $1 WHERE id = $2',
      [taxi_id, rideId]
    );
    await pool.query(
      'UPDATE taxis SET status = \'active\' WHERE id = $1',
      [taxi_id]
    );

    await pool.query('COMMIT');
    res.sendStatus(200);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error assigning taxi:', err);
    res.status(500).send('Server error');
  }
});


// Remove Assigned Taxis to Rides.
// PATCH /api/ridelogs/:id/remove-taxi
router.patch('/:id/remove-taxi', async (req, res) => {
  const rideId = req.params.id;

  try {
    await pool.query('BEGIN');

    // Get current taxi assigned to the ride
    const { rows } = await pool.query('SELECT taxi_id FROM ride_logs WHERE id = $1', [rideId]);
    const currentTaxiId = rows[0]?.taxi_id;

    if (currentTaxiId) {
      // Set taxi to inactive
      await pool.query('UPDATE taxis SET status = \'inactive\' WHERE id = $1', [currentTaxiId]);
    }

    // Remove taxi from ride
    await pool.query('UPDATE ride_logs SET taxi_id = NULL WHERE id = $1', [rideId]);

    await pool.query('COMMIT');
    res.sendStatus(200);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error removing taxi:', err);
    res.status(500).send('Server error');
  }
});



// PATCH /api/ridelogs/:id/end
// Mark ride as inactive when it ends and free driver & taxi
router.patch('/:id/end', async (req, res) => {
  const rideId = req.params.id;
  try {
    await pool.query('BEGIN');
    // Fetch current ride to know driver_id and taxi_id
    const { rows } = await pool.query(
      'SELECT driver_id, taxi_id FROM ride_logs WHERE id = $1',
      [rideId]
    );
    const { driver_id, taxi_id } = rows[0];
    // Update ride status
    await pool.query(
      'UPDATE ride_logs SET status = \'inactive\' WHERE id = $1',
      [rideId]
    );
    // Free up driver and taxi
    await pool.query(
      'UPDATE drivers SET status = \'inactive\' WHERE id = $1',
      [driver_id]
    );
    await pool.query(
      'UPDATE taxis SET status = \'inactive\' WHERE id = $1',
      [taxi_id]
    );
    await pool.query('COMMIT');
    res.sendStatus(200);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error ending ride:', err);
    res.status(500).send('Server error');
  }
});


// Update Ride logs
router.put('/:id', async (req, res) => {
  const rideId = req.params.id;
  const { pickup, dropoff, start_datetime, end_datetime } = req.body;
  try {
    const result = await pool.query(
      `UPDATE ride_logs 
       SET pickup = $1, dropoff = $2, start_datetime = $3, end_datetime = $4 
       WHERE id = $5 RETURNING *`,
      [pickup, dropoff, start_datetime, end_datetime, rideId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating ride log:', err);
    res.status(500).send('Server error');
  }
});


// Delete a Ride logs from a table
router.delete('/:id', async (req, res) => {
  const rideId = req.params.id;
  try {
    await pool.query('DELETE FROM ride_logs WHERE id = $1', [rideId]);
    res.sendStatus(204); // No content
  } catch (err) {
    console.error('Error deleting ride log:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
