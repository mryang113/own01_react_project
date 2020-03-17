import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'

export const createSaveUserAction = (userObj) =>{
  // 向local中保存数据
  localStorage.setItem('user',JSON.stringify(userObj.user))
  localStorage.setItem('token',userObj.token)
  
  return {type:SAVE_USER_INFO,data:userObj}
}

// 这个是模拟退出登录的
export const createDeleteUserAction = (userObj) =>{
  // 向local中保存数据
  localStorage.clear()
  
  return {type:DELETE_USER_INFO,data:''}
}