import React, { Component } from 'react'
import { Form, Input, Button, message} from 'antd';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../ajax'
// 发送axios请求借助于react脚手架第三方库来实现 json转换成urlencoded 形式的
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './imgs/logo.png'
import './css/login.less'
import { createSaveUserAction } from '../../redux/actions/login';
// 从Form上获取Item(antd)
const {Item} = Form


class Login extends Component {
  //表单提交的回调 
  onFinish = async(values) => {
    console.log('表单提交啦',values);
    const {username,password} = values
    let result = await reqLogin(username,password) 
    const {status,data,msg} = result
    if(status===0){
      message.success('登录成功！',1)
      this.props.save(data)
			this.props.history.replace('/admin')
		}else{
			message.warning(msg,1)
		}
  }

  //密码的自定义验证
  pwdValidator = (rule,value) => {
    if(!value){
      return Promise.reject('密码不能为空')
    }else if(value.length < 4){
      return Promise.reject('密码必须大于等于4位')
    }else if(value.length > 12){
      return Promise.reject('密码必须小于等于12位')
    }else if(!(/^\w+$/).test(value)){
      return Promise.reject('密码必须是字母、数字或下划线组成')
    }
    return Promise.resolve()
  }
  render() {
    // 渲染前 看下身份校验状态
    if(this.props.isLogin) return <Redirect to="/admin"/>
    return (
      <div id="login">
        <header className="login-header">
          <img src={logo} alt=""/>
          <h1>商品管理系统</h1>
        </header>
        <div className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Item
              name="username"
              rules={[
                {required: true, message:'用户名必须输入'},
                {max: 12, message:'用户名必小于等于12位'},
                {min: 4, message:'用户名必须大于等于4位'},
                {pattern: /^\w+$/, message:'用户名必须是字母、数字或下划线组成'},
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名"/>
            </Item>
            <Item
              name="password"
              rules={[
                {validator: this.pwdValidator},
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({isLogin:state.userInfo.isLogin}),//传递状态给UI 
  {save:createSaveUserAction}//传递操作状态的方法给UI
)(Login)
