import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd';

// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://localhost:3000'


//请求拦截器
axios.interceptors.request.use((config)=>{
  let {method,data} = config
  if(method.toLowerCase() === 'post' && data instanceof Object){
    // console.log('666',qs.stringify(data));
    config.data =  qs.stringify(data)
  }
  return config
});

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    
    return response.data
  },
  (err) => {
    //这里用 message 要在上面引入
    message.warning(err.message)
    return new Promise(()=>{})
  }
);

export default axios  // 这是加工过的axios自带拦截器功能;