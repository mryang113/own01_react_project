import {ADD_PERSON} from '../action_types'

// 箭头函数 一行代码 不谢花括号 想返回这条语句的结果,结果又是对象,对象外面就用()包起来;
export const createAddPersonAction = (personObj) => ({type: ADD_PERSON , data: personObj})

