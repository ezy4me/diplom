import axios from 'axios'

const loginConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}
export const LoginAPIInstance = axios.create(loginConfig)

const defaultConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}
export const DefaultAPIInstance = axios.create(defaultConfig)

const imageConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
export const ImageAPIInstance = axios.create(imageConfig)

