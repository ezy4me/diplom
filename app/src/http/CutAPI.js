import { DefaultAPIInstance } from "./index";

export const CutAPI = {
    getAllCuts() {
        const url = process.env.VUE_APP_CUT_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneCut(id) {
        const url = process.env.VUE_APP_CUT_API_URL
        const data = { id }
        return DefaultAPIInstance.get(url, { ...data })
    }
}