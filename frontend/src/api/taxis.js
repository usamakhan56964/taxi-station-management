// src/api/taxis.js

import axios from 'axios';

/**
 * GET /api/taxis
 * returns array of all taxis
 */
export function fetchTaxis() {
  return axios.get('/api/taxis').then(res => res.data);
}

/**
 * POST /api/taxis
 * payload: { number_plate, model, status }
 * status here should always be 'inactive' for new entries
 */
export function addTaxi(payload) {
  return axios.post('/api/taxis', payload).then(res => res.data);
}

/**
 * PUT /api/taxis/:id
 * payload: { number_plate, model, status }
 */
export function editTaxi(id, payload) {
  return axios.put(`/api/taxis/${id}`, payload).then(res => res.data);
}

/**
 * DELETE /api/taxis/:id
 */
export function removeTaxi(id) {
  return axios.delete(`/api/taxis/${id}`);
}
