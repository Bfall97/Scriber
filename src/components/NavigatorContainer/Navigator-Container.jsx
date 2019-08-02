import React, { Component } from 'react'
import Navigator from './../Navigator/Navigator.js'

const notifications = require('react-notifications')
const { NotificationManager } = notifications

export default class NavigatorContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stepNum: 0,
      startNum: 0,
      subsetNum: 6, // Sets the # of notes display at a time in the sidenavP

    }
  }

   // ---Handle Dropdown Note List Stepper----//
   onStepClick = numChange => {
     this.setState({
       stepNum: numChange,
       startNum: this.state.startNum + numChange,
       subsetNum: this.state.subsetNum + numChange
     })
   };

    // TODO: Either fix this function or use them individually as you are now.
    createNotification = type => {
      return () => {
        // eslint-disable-next-line default-case
        switch (type) {
          case 'info':
            NotificationManager.info('Info message')
            break
          case 'success':
            NotificationManager.success(
              'Note saved',
              'Save Successful',
              2000,
              null,
              true
            )
            break
          case 'warning':
            NotificationManager.warning(
              'Warning message',
              'Close after 3000ms',
              3000
            )
            break
          case 'error':
            NotificationManager.error('Error message', 'Click me!', 5000, () => {
              alert('callback')
            })
            break
        }
      }
    };

    render () {
      return (

        <Navigator
          getLink = {this.props.getLink}
          subsetNum = {this.state.subsetNum}
          stepNum={this.state.stepNum}
          startNum={this.state.startNum}
          view={this.props.view}
          data={this.props.data}
          link={this.props.link}
          layout={this.props.layout}
          newNote ={this.props.newNote}
          onStepClick = {this.onStepClick}
        />

      )
    }
}
