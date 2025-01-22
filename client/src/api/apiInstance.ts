import axios from "axios";
import { getCookie } from "../utils";

export const LoginAPIinstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
    withCredentials: true,
    headers: {
        'Authorization': getCookie('token'),
    },
});

export const APIinstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
});