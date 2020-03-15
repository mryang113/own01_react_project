//store 是一个redux中最核心的对象
import {createStore} from 'redux' //createStore用于创建store
//引入count_reducer,专门用于加工count的状态;
import countReducer from './count_reducer'

// 创建并暴露store对象;
export default createStore(countReducer);
