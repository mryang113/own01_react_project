import {combineReducers} from 'redux'
import loginReducer from './login'
import headerReducer from './header'
import categoryReducer from './category'

export default combineReducers({ //combineReducers传入的那个对象，就是redux中的那个大状态对象
	userInfo:loginReducer,
	title: headerReducer,
	categoryList: categoryReducer
})