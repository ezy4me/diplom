import { DefaultAPIInstance } from "./index";

export const UserAPI = {
    getAllUsers() {
        const url = process.env.VUE_APP_USER_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneUser(id) {
        const url = process.env.VUE_APP_USER_API_URL + id
        return DefaultAPIInstance.get(url)
    },

    createUser(email, password, fio, phone) {
        const url = `${process.env.VUE_APP_USER_API_URL}registration`
        const data = { email, password, fio, phone }
        return DefaultAPIInstance.post(url, { ...data })
    },

    updateUser(id, email, fio, phone) {
        const url = process.env.VUE_APP_USER_API_URL

        const data = { id, email, fio, phone }

        return DefaultAPIInstance.put(url, { ...data })
    },

    deleteUser(id) {
        const url = `${process.env.VUE_APP_USER_API_URL}${id}`
        return DefaultAPIInstance.delete(url)
    }
}