import React, { Component } from 'react'
import {connect} from 'react-redux'

class Admin extends Component {
  render() {
    return (
      <div style= {{fontSize : '30px'}}>
        欢迎  ...aaa
      </div>
    )
  }
}

export default connect(
  (state) => ({name: state.userInfo.user.username}),// 用于传递状态
)(Admin)
