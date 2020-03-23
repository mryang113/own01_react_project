import React, { Component } from 'react'
import logo from '../../static/imgs/logo.png'
import { Menu} from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createSaveTitleAction} from '../../redux/actions/header'
import menus from '../../config/menu_config'
import './css/let_nav.less'

const {SubMenu,Item } = Menu;

// import menus from '../../config/menu_config'

class LeftNav extends Component {

  createMenu = (menuArr) => {
    return menuArr.map((menuObj) => {
      if(!menuObj.children){
        return(
          <Item key={menuObj.key} onClick={() => {this.props.saveTitle(menuObj.title)}}>
            <Link to={menuObj.path}>
            <menuObj.icon/>
            <span style={{marginLeft:'10px'}}>{menuObj.title}</span>
            </Link>
          </Item>
        )
      }else{
        return (
          <SubMenu
            key={menuObj.key}
            title={
              <span>
                <menuObj.icon/>
                <span>{menuObj.title}</span>
              </span>
            }
          >
            {this.createMenu(menuObj.children)}
          </SubMenu>
        )
      }
    })
  }

  //根据菜单的key计算菜单的title
  getTitleByPath = () => {
    console.log('redux中没有title了，只能靠getTitleByPath计算了');
    //根据当前浏览器中的路径的最后一个单词，去菜单数组中匹配，计算出title
    let pathArr =  this.props.location.pathname.split('/')
    let key = pathArr.reverse()[0]
    if(key === 'admin') key = 'home' // 这个是已登录进去默认重定向会去admin 所以赋值给home即可解决;
    if(pathArr.indexOf('product') !== -1) key = 'product' //后加 add-update 时候加的
    // console.log('$$$',key);
    let title = ''
    menus.forEach((menuObj) => {
      //1.若当前的这个菜单对象有children
      if(menuObj.children instanceof Array){
        let result = menuObj.children.find((childrenObj) => {
          return childrenObj.key === key 
        })
        if(result) title = result.title
      }else{//2.若当前的这个菜单对象无children
        if(menuObj.key === key) title = menuObj.title
      }
    })
    this.props.saveTitle(title)
  }

  componentDidMount(){
    //console.log('left---componentDidMount');//1次
    //如果redux中没有了title了(用户刷新页面)，用该方法计算
    if(!this.props.title){
      this.getTitleByPath()
    }
  }
  

  render() {
    // const currentPath = this.props.location.pathname
    // console.log("@@",currentPath);//查看用
    const currentPathArr = this.props.location.pathname.split('/')
    let currentKey = currentPathArr.reverse()[0]
    if(currentPathArr.indexOf('product') !== -1) currentKey = 'product' //后加 add-update 时候加的
    // console.log('###',currentKey); //测试用
    return (
      <div className="left-nav">
        <div className="nav-header">
          <img src={logo} alt=""/>
          <h1>商品管理系统</h1>
        </div>
        <div>
          <Menu
            // defaultSelectedKeys={[currentKey]} //一上来默认选中 bug 换成 selectedKeys 登陆完就会一上来选中home;
            selectedKeys={[currentKey]}
            defaultOpenKeys={currentPathArr} //默认展开的菜单
            mode="inline"  //内嵌模式 
            theme="dark" // 暗色主题
          >
            {this.createMenu(menus)}
          </Menu>
        </div>
      </div>
    )
  }
}

export default connect(
  () => ({}),//传递状态
  {saveTitle:createSaveTitleAction} //传递操作状态的方法
)(withRouter(LeftNav)) //普通组件当路由组件用;
