import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Handle all errors in one place
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Server may be down.');
    }
    if (!error.response) {
      throw new Error('Cannot connect to server. Check your connection.');
    }

    const status = error.response.status;
    const message = error.response.data?.message || 'Something went wrong';

    if (status === 429) throw new Error('Too many attempts. Please wait.');
    if (status === 503) throw new Error('Service unavailable. Try later.');
    if (status === 404) throw new Error('Endpoint not found.');

    throw new Error(message);
  }
);

export default api;