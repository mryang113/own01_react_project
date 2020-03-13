import React, { Component } from 'react'
import {Button} from 'antd'

export default class App extends Component {
  render() {
    return (
      <div>
        app....aaa
        <br/>
        <br/>
        <Button>点我</Button><br/>
        <Button type="primary">Primary</Button><br/>
        <Button>Default</Button><br/>
        <Button type="dashed">Dashed</Button><br/>
        <Button type="link">Link</Button><br/>
      </div>
    )
  }
}
