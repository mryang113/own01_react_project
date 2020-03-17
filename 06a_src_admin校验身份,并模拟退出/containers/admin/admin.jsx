import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {createDeleteUserAction} from '../../redux/actions/login'

class Admin extends Component {
  logOut = () => {
    this.props.logout()
  }
  render() {
    if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <div style= {{fontSize : '30px'}}>
        欢迎: {this.props.name} ...aaa
        <br/>
        <button onClick={this.logOut}>退出登录</button>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    name: state.userInfo.user.username,
    isLogin: state.userInfo.isLogin
  }),// 用于传递状态
  {
    logout: createDeleteUserAction
  }//用于传递操作状态的方法
)(Admin)
