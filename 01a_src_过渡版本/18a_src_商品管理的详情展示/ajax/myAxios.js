import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd';
import NProgress from 'nprogress'
import {createDeleteUserAction} from '../redux/actions/login'
import {createSaveTitleAction} from '../redux/actions/header'
import store from '../redux/store'
import 'nprogress/nprogress.css' // 这个要自己引入进度条 的css样式

// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://localhost:3000'


//请求拦截器
axios.interceptors.request.use((config)=>{
  NProgress.start() //进度条开始
  let {method,data} = config
  
  // 1-token- 获取token
  let {token} = store.getState().userInfo
  if(token){
    config.headers.Authorization = 'atguigu_' + token  // 服务器认这个请求头携带的参数,百度,糯米用的就是这个
  }
  // 2-token 携带token 
  if(method.toLowerCase() === 'post' && data instanceof Object){
    // console.log('666',qs.stringify(data));
    config.data =  qs.stringify(data)
  }
  return config
});

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    NProgress.done() //进度条结束
    return response.data
  },
  (err) => {
    NProgress.done() //进度条结束
    //1,服务器没响应 2, 服务器返回的状态码不是2开头
    console.log(err);// 验证token失效时 输出中err包含着响应response里有status码是 401,好做判断;
    if(err.response.status === 401){
      message.error()
      store.dispatch(createDeleteUserAction())
      store.dispatch(createSaveTitleAction(''));//如果身份token过期,就先提示从新登陆,然后直接store分发一个删除的action
    }
    //这里用 message 要在上面引入
    message.warning(err.message)
    return new Promise(()=>{})
  }
);

export default axios  // 这是加工过的axios自带拦截器功能;
