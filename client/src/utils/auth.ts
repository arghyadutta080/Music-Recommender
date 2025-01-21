import { loginWithEmail } from "../api"

export const userLogin = async (username: string, password: string) => {
    try {
        const responseData = await loginWithEmail({ username, password })
        document.cookie = `token=${responseData.token}; path=/; max-age=86400; samesite=strict; secure: HttpOnly`
        return responseData
    } catch (error: unknown) {
        // return catchErrorFunc(error)
        console.log(error)
    }
}