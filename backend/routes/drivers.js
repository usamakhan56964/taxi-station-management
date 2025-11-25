const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all drivers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM drivers ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


// CREATE driver
router.post('/', async (req, res) => {
  console.log('📥 POST /api/drivers - Body:', req.body);

  // Trim inputs
  const name = req.body.name?.trim();
  const telephone = req.body.telephone?.trim();

  if (!name || !telephone) {
    console.error('❌ Validation failed: Missing name or telephone');
    return res.status(400).json({ error: 'Name and telephone are required' });
  }

  try {
    const status = 'inactive'; // force lowercase
    const result = await pool.query(
      'INSERT INTO drivers (name, telephone, status) VALUES ($1, $2, $3) RETURNING *',
      [name, telephone, status]
    );

    console.log('✅ Driver Added:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ DB Insert Error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


// Deleting a Drivers with auto sequence managing
// DELETE driver and reset sequence if table empty
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // 🗑 Delete the requested driver
    await pool.query('DELETE FROM drivers WHERE id=$1', [id]);

    // 🔥 Check if table is now empty
    const result = await pool.query('SELECT COUNT(*) FROM drivers');
    const count = parseInt(result.rows[0].count);

    if (count === 0) {
      // ✅ Table is empty, reset sequence
      await pool.query( 'ALTER SEQUENCE drivers_id_seq RESTART WITH 1');
      console.log('🔄 Table emptied. Sequence reset to 1.');
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('❌ Failed to delete driver:', err);
    res.status(500).send('Server Error');
  }
});



// UPDATE driver details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, telephone } = req.body;

  if (!name?.trim() || !telephone?.trim()) {
    console.error('❌ Validation failed: Missing name or telephone');
    return res.status(400).json({ error: 'Name and telephone are required' });
  }

  try {
    const result = await pool.query(
      'UPDATE drivers SET name=$1, telephone=$2 WHERE id=$3 RETURNING *',
      [name.trim(), telephone.trim(), id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    console.log('✅ Driver Updated:', result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('❌ DB Update Error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


module.exports = router;