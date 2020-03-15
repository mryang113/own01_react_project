import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'
import {Provider} from 'react-redux'
import App from './App'


// redux 第一种方法,没用react-redux库,时要用这个store身上的subscribe这个方法实时渲染,单词和订阅消息一样;
/*  ReactDOM.render(<App store={store}/>,document.getElementById('root'));
    store.subscribe(() => {
    ReactDOM.render(<App store={store}/>,document.getElementById('root'));
    }) 
*/

//第二版 引入 react-redux身上的一个 Provider 方法 ,这个是相对于App组件的顶级跟组件标签,在他身上放置一个 store老板就够了
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
document.getElementById('root'))