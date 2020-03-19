import React, { Component } from 'react'
import logo from '../../static/imgs/logo.png'
import { Menu} from 'antd';
import menus from '../../config/menu_config'

import './css/let_nav.less'


const { SubMenu, Item } = Menu;

// import menus from '../../config/menu_config'

export default class LeftNav extends Component {

  createMenu = (menuArr) => {
    return menuArr.map((menuObj) => {
      if(!menuObj.children){
        return(
          <Item key={menuObj.key}>
            <menuObj.icon/>
            <span>{menuObj.title}</span>
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
  

  render() {
    return (
      <div className="left-nav">
        <div className="nav-header">
          <img src={logo} alt=""/>
          <h1>商品管理系统</h1>
        </div>
        <div>
          <Menu
            defaultSelectedKeys={['2']} //一上来默认选中
            defaultOpenKeys={['sub1']} //默认展开的菜单
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
