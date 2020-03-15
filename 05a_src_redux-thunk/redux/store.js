//store 是一个redux中最核心的对象,这个applyMiddleware 是最后 引入 react-thunk 而用的
import {createStore,applyMiddleware} from 'redux' //createStore用于创建store
//引入count_reducer,专门用于加工count的状态;
import countReducer from './count_reducer'

//引入redux-thunk
import thunk from 'redux-thunk'

// 创建并暴露store对象;
export default createStore(countReducer,applyMiddleware(thunk));
