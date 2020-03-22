import {SAVE_CATEGORY_LIST} from "../action_types"

export default function (preState=[],action) {
  const {type,data} = action
  let newState
  switch (type) {
    case SAVE_CATEGORY_LIST: //如果是保存头部的标题
      newState = [...data.reverse()]
      return newState
    default:
      return preState
  }
}