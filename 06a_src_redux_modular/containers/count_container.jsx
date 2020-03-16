//该文件是count组件的容器组件，容器组件要给count组件传递：1.redux中的状态； 2.操作状态的方法 

// 引入 UI组件
import Count from '../components/count'
// 引入connect方法
import {connect} from 'react-redux'

import{
  createIncrementAction,
  createDecrementAction,
  createIncrementDelayAction
}
from '../redux/actions/count_action_creator'

/*
  关于connect方法:
    1.connect函数接收两个函数作为参数，第一个用于传递状态，第二个用于传递操作状态的方法。 
    2.connect函数接收两个函数作为参数，这两个函数必须都返回一个对象。
    3.connect()()可以按成：1.生成容器组件；2.可以让UI组件和生成的那个容器组件建立起联系。
*/


// 第一种分开写法,好理解,他这些属性用connect传给了 Count组件的props属性中,在Count组件中可以输出this查看;
/* //将redux中所保存的状态，通过props传递给UI组件
function mapStateToProps(state){
	return {number :state} 
}
//将操作状态的方法，通过props传递给UI组件 
function mapDispatchToProps(dispatch){
	return {
    increment: (value) => {dispatch(createIncrementAction(value))},
    decrement: (value) => {dispatch(createDecrementAction(value))}
  } 
} */

 
// 标准写法,下面还可以简写   
/* export default connect(
  state => ({number: state}),
  dispatch => ({
    increment : value => {dispatch(createIncrementAction(value))},
    decrement : value => {dispatch(createDecrementAction(value))},
    incrementDelay : (value,time) => {dispatch(createIncrementDelayAction(value,time))}
  })
)(Count) */

//,在redux底层帮我们 写成上面那种,在这redux环境下,下面也可以这样简写
export default connect(
	state => ({number:state.count, personNumber:state.persons.length}),
	{
		increment:createIncrementAction,
		decrement:createDecrementAction,
		incrementDelay:createIncrementDelayAction
	}
)(Count)
