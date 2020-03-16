import React, { Component } from 'react'
import CountContainer from './containers/count_container'
import PersonContainer from './containers/person_container'

export default class App extends Component {
  render() {
    // const {store} = this.props
    return (
      <div>
        <CountContainer/>
        <br/>
        <PersonContainer/>
      </div>
    )
  }
}

