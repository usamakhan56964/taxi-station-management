import axios from 'axios';

const API = axios.create({
  baseURL: '/api/drivers',
});

export const getDrivers = async () => {
  const res = await API.get('/');
  return res.data;
};

export const createDriver = async ({ name, telephone }) => {
  const res = await API.post('/', { name, telephone });
  return res.data;
};

export const updateDriver = async (id, payload) => {
  const res = await API.put(`/${id}`, payload);
  return res.data;
};

export const deleteDriver = async id => {
  await API.delete(`/${id}`);
};


