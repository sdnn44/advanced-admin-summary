import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://codmod-admin-summary-backend.vercel.app/api/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      // Check if response exists before accessing its properties
      if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
        // window.location.reload();
      } else if (response.status === 404) {
        // Show not found
        console.error('Not found');
      }
    } else {
      // Handle error without a response (e.g., network error)
      console.error('Network error', error);
    }

    throw error;
  }
);

export default axiosClient;
