import instance from '../http/instance'
/**用户api统一入口*/


//用户登入
export const login = (phone,captcha) => instance.get(`/login/cellphone?phone=${phone}&captcha=${captcha}`)
export const loginn = (phone,password) => instance.get(`/login/cellphone?phone=${phone}&password=${password}`)
//用户登出
export const logout=()=>instance.get(`/logout`)