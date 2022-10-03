//api 统一出口
import * as api from './api'
import * as userApi from './user'

//暴露全部的API接口
export default{
    ...api,
    ...userApi
}