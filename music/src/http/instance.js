import axios from "axios";
import { Message } from "element-ui";
import config from "./config";

const { api_base_url } = config

//对axios请求进行二次封装
const instance = axios.create({
    time: 1000 * 60,
    baseURL: api_base_url,
    withCredentials: true
})

//请求拦截器
instance.interceptors.request.use(config=>{
    return config
},err=>{
    this.$message.error({ message: '请求超时!' })
    return Promise.reject(err)
})

//响应拦截器
instance.interceptors.response.use(
    resresponse=>{
    return Promise.resolve(resresponse)
},err=>{
    config.log(err)
    this.$message.err("未知错误")
})


export default instance