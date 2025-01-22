import { LoginAPIinstance } from "./apiInstance";

export const getProfile = async () => {
    try {
        const response = await LoginAPIinstance.get(
            '/profile/view'
        )
        console.log(response)
        return response?.data;
    } catch (error: unknown) {
        // return catchErrorFunc(error)
        console.log(error)
    }
}