import { DefaultAPIInstance } from "./index";

export const RequestAPI = {
    getAllRequests() {
        const url = process.env.VUE_APP_REQUEST_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneRequest(id) {
        const url = process.env.VUE_APP_REQUEST_API_URL + id
        return DefaultAPIInstance.get(url)
    },

    create(name, email, phone, description, requestType) {
        const url = process.env.VUE_APP_REQUEST_API_URL
        const data = { name, email, phone, description, requestType }
        return DefaultAPIInstance.post(url, { ...data })
    },

    deleteRequest(id) {
        const url = process.env.VUE_APP_REQUEST_API_URL + id
        return DefaultAPIInstance.delete(url)
    },

    updateRequest(id, name, email, phone, description, requestStatus) {
        const url = process.env.VUE_APP_REQUEST_API_URL
        const data = { id, name, email, phone, description, requestStatus }
        return DefaultAPIInstance.put(url, { ...data })
    },

    getAllRequestTypes() {
        const url = process.env.VUE_APP_REQUESTTYPE_API_URL
        return DefaultAPIInstance.get(url)
    },

    getAllRequestStatuses() {
        const url = process.env.VUE_APP_REQUESTSTATUS_API_URL
        return DefaultAPIInstance.get(url)
    },
}