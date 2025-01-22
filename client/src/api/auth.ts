import { APIinstance, LoginAPIinstance } from "./apiInstance";

interface user {
    username: string;
    password: string;
}

export const registerWithEmail = async (userInfo: user) => {
    try {
        const response = await APIinstance.post(
            '/auth/register', userInfo
        )
        console.log(response)
        return response?.data;
    } catch (error: unknown) {
        // return catchErrorFunc(error)
        console.log(error)
    }
}

export const loginWithEmail = async (userInfo: user) => {
    try {
        const response = await APIinstance.post(
            '/auth/login', userInfo
        )
        console.log(response)
        return response?.data;
    } catch (error: unknown) {
        // return catchErrorFunc(error)
        console.log(error)
    }
}

export const logout = async () => {
    try {
        const response = await LoginAPIinstance.post(
            '/auth/logout'
        )
        console.log(response)
        return response?.data;
    } catch (error: unknown) {
        // return catchErrorFunc(error)
        console.log(error)
    }
}