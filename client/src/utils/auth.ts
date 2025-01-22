import { NavigateFunction } from "react-router-dom"
import { getProfile, loginWithEmail } from "../api"
import { userStateType } from "../lib/types"
import { getCookie, setCookie } from "./cookie"

export const userLogin = async (username: string, password: string, setUser: (userInfo: userStateType) => void, navigate: NavigateFunction) => {
    try {
        const responseData = await loginWithEmail({ username, password })
        // console.log(responseData);
        setCookie("token", responseData.token, 7)
        // const cookie = getCookie("token")
        // setTimeout(async () => {
            const userData = await getProfile()
            setUser({ userData, userLoading: false }) // need for checking because state has an loading state
            console.log(userData)
            navigate("/")
        // }, 2000);
        return responseData
    } catch (error: unknown) {
        // return catchErrorFunc(error)
        console.log(error)
    }
}