//store 是一个redux中最核心的对象,这个applyMiddleware 是最后 引入 react-thunk 而用的
import {createStore,applyMiddleware} from 'redux' //createStore用于创建store
//引入count_reducer,专门用于加工count的状态;
import reducer from './reducers/index'

//引入redux-thunk
import thunk from 'redux-thunk'

// 最后一步骤 引入redux-devtools-extension，用于唤醒redux开发者工具
import {composeWithDevTools} from 'redux-devtools-extension'

// 创建并暴露store对象;
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));
