import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {createDeleteUserAction} from '../../redux/actions/login'
import {Layout} from 'antd'
import LeftNav from '../left_nav/left_nav'
import Header from '../header/header'
import './css/admin.less'

const {Footer,Sider,Content } = Layout;

class Admin extends Component {
  logOut = () => {
    this.props.logout()
  }
  render() {
    if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <Layout className="admin-root">
        <Sider className="admin-sider">
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
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
