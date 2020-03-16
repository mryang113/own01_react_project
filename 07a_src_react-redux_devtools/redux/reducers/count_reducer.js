/* 
    count_reducer的功能是:
    1. 拿到旧的状态,根据用的action(包含着: type ,data),返回新的状态。
    2. reducer会在两个时候调用: 1.初始状态的时候 2.更新状态的时候 
*/
import {INCREMENT,DECREMENT} from '../action_types'

export default function (preState=0,action) {
  const {type,data} = action
  console.log('@@',type,data);
  let newState
  switch (type) {
    case INCREMENT: //如果是加
      newState = preState + data
      console.log('##',newState);
      return newState
    case DECREMENT: //如果是减法
      newState = preState - data
      return newState
    default: //如果是初始化
      return preState
  }
}