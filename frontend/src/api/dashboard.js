// src/services/dashboard.js
// Central place for all dashboard-related API calls

const BASE = '/api/dashboard'; // Vite proxy maps /api to backend

/**
 * Fetch total counts of drivers, taxis, and ride logs.
 * Returns { totalDrivers, totalTaxis, totalRideLogs }
 */
export async function fetchCounts() {
  const res = await fetch(`${BASE}/counts`);
  if (!res.ok) throw new Error('Failed to fetch counts');
  return res.json();
}

/**
 * Fetch the 10 most recent rides with driver, taxi, ride_id, status.
 * Returns array of { ride_id, driver, taxi, status, start_datetime }
 */
export async function fetchRecent() {
  const res = await fetch(`${BASE}/recent`);
  if (!res.ok) throw new Error('Failed to fetch recent activity');
  return res.json();
}
