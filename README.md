### day01
1. 创建脚手架，随后精简。
2. 引入了antd，按需引入，自定义主题。
3. 引入了react-router-dom，搭建一级路由。
4. login静态页面(无antd)
5. 引入antd的Form组件
6. 用户名的声明式校验
7. 密码的自定义验证
* 先后安装的包有
01  yarn add antd
02  yarn add react-app-rewired customize-cra
03  yarn add babel-plugin-import
04  yarn add less less-loader
05  react-router-dom  //这个路由用的

```js
//引入图片方式 
import logo from './imgs/logo.png'
<img src={logo} alt=""/>
```
```
******* 在一个项目里安装包,如果用 <span style='color:#f66'>**npm** </span>就别用**yarn**,  用**yarn** 就不用<span style='color:#f66'>**npm** </span> 因为俩不同的软件安装有可能就会出现问题  , 一般 React开发推介用 注意啦!!!! 
```

### day02 ---redux 有分支
01  yarn add redux --save
02  yarn add react-redux --save
03  yarn add redux-thunk --save  //react-redux 的一个中间件

### day03 
* 安装 chrome 浏览器插件 , redux调试工具
01  yarn add --save-dev redux-devtools-extension  
```js
安装完后 再store 里面引入 import {composeWithDevTools} from 'redux-devtools-extension' 
引入完,最后用上 export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));
然后查看开发者调试工具 那个插件就亮了,可以操作啦 ;
```
* 转回 商品管理项目
01  在package.json 最后里面平级加上 "proxy": "http://localhost:4000" 就可以啦,react底层帮你在3000转发到4000 
02 yarn add axios --save 
* 发送axios请求借助于react脚手架第三方库来实现 json转换成urlencoded 形式的
import qs from 'querystring'
* axios版 用的antd里的message方法 要在上面引入


		
		