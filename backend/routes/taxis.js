// routes/taxis.js

const express = require('express');
const router = express.Router();
const pool = require('../db'); // your configured PostgreSQL pool

// GET all
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM taxis ORDER BY id');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// CREATE new (status defaulted to 'inactive' client-side)
router.post('/', async (req, res, next) => {
  const { number_plate, model, status } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO taxis(number_plate, model, status) VALUES($1, $2, $3) RETURNING *',
      [number_plate, model, status]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// UPDATE existing
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { number_plate, model, status } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE taxis SET number_plate=$1, model=$2, status=$3 WHERE id=$4 RETURNING *',
      [number_plate, model, status, id]
    );
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE
/*router.delete('/:id', async (req, res, next) => {
  try {
    await pool.query('DELETE FROM taxis WHERE id=$1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});*/



// DELETE one taxi, and reset ID sequence if table becomes empty
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // 1. Delete the taxi by ID
    await pool.query('DELETE FROM taxis WHERE id = $1', [id]);

    // 2. Check if table is now empty
    const { rows } = await pool.query('SELECT COUNT(*) FROM taxis');
    const count = parseInt(rows[0].count);

    // 3. If empty, reset the ID sequence
    if (count === 0) {
      await pool.query('ALTER SEQUENCE taxis_id_seq RESTART WITH 1');
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
