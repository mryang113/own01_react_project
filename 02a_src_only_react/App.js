import React, { Component } from 'react'

export default class App extends Component {

  state = {count: 0}
  

  //加法
  increment = () => {
    let {value} = this.refs.numberNode
    let {count} = this.state
    count += value*1
    this.setState({count})
  }

  //减法
  decrement = () => { 
    let {value} = this.refs.numberNode
    let {count} = this.state
    count -= value*1
    this.setState({count})
  }

  //当前为奇数时再加
  incrementIfOdd = () => {
    let {value} = this.refs.numberNode
    let {count} = this.state
    if(count % 2 === 1){
      count += value*1
      this.setState({count})
    } 
  }

  //延迟0.5秒加
  incrementAsync = () => {
    let {value} = this.refs.numberNode
    let {count} = this.state
    setTimeout(() => {
      count += value*1
      this.setState({count})
    }, 1000);
  }

  render() {
    const {count} = this.state
    return (
      <div>
        {/* <h2>当前总数为: <span className='color'>{count}</span> </h2> */}
        <h2>当前总数为: <span style={{color:'#f66'}}>{count}</span> </h2>
        <select ref="numberNode">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>—</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
