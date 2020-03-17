//项目中所有发送请求的方法都会写在这里
import myAxios from './myAxios'

export const reqLogin = (username,password) => myAxios.post('/login',{username,password})