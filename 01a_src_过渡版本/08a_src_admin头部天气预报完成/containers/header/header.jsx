import React, { Component } from 'react'
import {Button,Modal} from 'antd'
import screenfull from 'screenfull'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import {createDeleteUserAction} from '../../redux/actions/login'
import {reqWeather} from '../../ajax'
import './css/header.less'
const { confirm } = Modal;

class Header extends Component {

  state = {
    isFull: false, //标识是否全屏 
    date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'),
    weatherInfo:{
			dayPictureUrl:'',
			temperature:'',
			weather:''
		}
  }

  fullScreen = () => {
    //让网页全屏
    screenfull.toggle();
  }

  logOut = ()=>{
    // this.props.logout() // 测试之前写的,可以用
		confirm({
			title: '确定退出吗？',
			icon: <ExclamationCircleOutlined />,
			content: '退出后要重新登录',
			okText:'确定',
			cancelText:'取消',
			onOk:()=> { //确认按钮的回调
				this.props.logout()
			},
		});
  }
  
  getWeather = async() => {
    let result = await reqWeather()
		const {dayPictureUrl,weather,temperature} = result
		this.setState({dayPictureUrl,weather,temperature})
  }

  componentDidMount(){
    //标识是否全屏 
    screenfull.onchange(() => {
      let isFull = !this.state.isFull
      this.setState({isFull})
    })
    //开启更新时间的定时器
		this.timer = setInterval(() => {
			this.setState({date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss')})
    },1000);
    //请求天气信息 
    this.getWeather()
  }
  render() {
    const {isFull,date,dayPictureUrl,weather,temperature} = this.state
    return (
      <div className="header">
        <div className="header-top">
          <Button onClick={this.fullScreen} size="small">
            {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </Button>
          <span className="user">欢迎, {this.props.username}</span>
          <Button onClick={this.logOut} type="link">退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">
            <h2>首页</h2> 
          </div>
          <div className="bottom-right">
          <span>{date}</span>
            <img src={dayPictureUrl} alt="pic"/>
            <span>{weather}温度: {temperature}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
(state) => ({username: state.userInfo.user.username}),//传递状态
{
  logout: createDeleteUserAction
}//传递操作状态的方法
)(Header)
