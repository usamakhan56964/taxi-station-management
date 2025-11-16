import axios from 'axios';

// Get all rides
export const fetchRideLogs = () => axios.get('/api/ridelogs');

// Create a new ride
export const addRideLog = data => axios.post('/api/ridelogs', data);

// Get inactive drivers for assignment
export const fetchInactiveDrivers = () => axios.get('/api/drivers?status=inactive');

// Assign driver to a ride
export const assignDriverToRide = (rideId, payload) =>
  axios.patch(`/api/ridelogs/${rideId}/assign-driver`, payload);

// Get inactive taxis for assignment
export const fetchInactiveTaxis = () => axios.get('/api/taxis?status=inactive');

// Assign taxi to a ride
export const assignTaxiToRide = (rideId, payload) =>
  axios.patch(`/api/ridelogs/${rideId}/assign-taxi`, payload);

// End an active ride
export const endRide = rideId => axios.patch(`/api/ridelogs/${rideId}/end`);

// Update ride details
export const updateRideLog = (rideId, data) =>
  axios.put(`/api/ridelogs/${rideId}`, data);

// Delete a ride
export const deleteRideLog = rideId =>
  axios.delete(`/api/ridelogs/${rideId}`);

// Remove driver from ride
export const removeDriverFromRide = (rideId) =>
  axios.patch(`/api/ridelogs/${rideId}/remove-driver`);


// Remove taxi from ride
export const removeTaxiFromRide = (rideId) =>
  axios.patch(`/api/ridelogs/${rideId}/remove-taxi`);