import axios from "axios";
import store from "./store";
import router from "./router";

//create axiosclient from env base url.
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// config requeset header authorization with auth token from sessionstorage
axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
});

//return server response and check error for future route.
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            sessionStorage.removeItem("TOKEN");
            router.push({ name: "Login" });
        } else if (error.response.status === 404) {
            router.push({ name: "NotFound" });
        }
        throw error;
    }
);

export default axiosClient;
