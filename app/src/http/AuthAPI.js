import { LoginAPIInstance, DefaultAPIInstance } from "./index";

export const AuthAPI = {
    login(email, password) {
        const url = `${process.env.VUE_APP_USER_API_URL}login`
        const data = { email, password }
        return LoginAPIInstance.post(url, data)
    },

    logout() {
        const url = process.env.VUE_APP_USER_API_URL
        return DefaultAPIInstance.post(url)
    }
}