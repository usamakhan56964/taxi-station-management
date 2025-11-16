// routes/dashboard.js
// Defines API endpoints for dashboard counts and recent activity

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// PostgreSQL connection pool reads env vars: PGHOST, PGUSER, etc.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

/**
 * GET /api/dashboard/counts
 * Returns totalDrivers, totalTaxis, totalRideLogs as JSON
 */
router.get('/counts', async (req, res) => {
  try {
    // Run three COUNT(*) queries in parallel
    const [dRes, tRes, rRes] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM public.drivers'),
      pool.query('SELECT COUNT(*) FROM public.taxis'),
      pool.query('SELECT COUNT(*) FROM public.ride_logs')
    ]);

    // Parse counts to integers
    const counts = {
      totalDrivers: parseInt(dRes.rows[0].count, 10),
      totalTaxis: parseInt(tRes.rows[0].count, 10),
      totalRideLogs: parseInt(rRes.rows[0].count, 10)
    };

    res.json(counts);
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /api/dashboard/recent
 * Returns last 10 rides joined with driver name, taxi plate, and status
 */
/*router.get('/recent', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        rl.id      AS ride_id,
        d.name     AS driver,
        t.number_plate AS taxi,
        rl.status,
        rl.start_datetime
      FROM public.ride_logs rl
      LEFT JOIN public.drivers d ON rl.driver_id = d.id
      LEFT JOIN public.taxis t   ON rl.taxi_id   = t.id
      ORDER BY rl.start_datetime DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});*/

router.get('/recent', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        rl.id AS ride_id,
        d.name AS driver,
        t.number_plate AS taxi,
        rl.start_datetime,
        rl.end_datetime,
        CASE
          WHEN NOW() < rl.start_datetime THEN 'upcoming'
          WHEN NOW() >= rl.start_datetime AND NOW() <= rl.end_datetime THEN 'active'
          ELSE 'completed'
        END AS status
      FROM public.ride_logs rl
      LEFT JOIN public.drivers d ON rl.driver_id = d.id
      LEFT JOIN public.taxis t   ON rl.taxi_id = t.id
      ORDER BY rl.start_datetime DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
