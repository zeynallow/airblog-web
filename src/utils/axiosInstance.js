import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const accessToken = user?.token
        if (accessToken) {
            if (config.headers) config.headers.authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;