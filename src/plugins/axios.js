import axios from "axios"
import Vue from "vue"
import VueAxios from "vue-axios"


const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

instance.interceptors.response.use(response => {
    if (response.data.code && response.data.code !== '00') {
        console.log(1)
        Vue.prototype.$message.error(response.data.message)
        return Promise.reject(response.data)
    }
    return response
}, (err) => {
    console.log(process.env.apiUrl)
    Vue.prototype.$message.error("请求失败")
    return Promise.reject(err)
})

Vue.use(VueAxios, instance)