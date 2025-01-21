import axios from "axios";

export const LoginAPIinstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
    // withCredentials: true,
    headers: {
        'Authorization': '',
    },
});

export const APIinstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
    // withCredentials: true,
});