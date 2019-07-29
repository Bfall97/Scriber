// sidenav from https://reactjsexample.com/react-side-nav-component/
import React, { Component } from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import NoteList from './NoteList'
import { Note } from 'styled-icons/boxicons-solid/Note'
import { NoteAdd } from 'styled-icons/material/NoteAdd'
import DotsMobileStepper from './MobileStep.js'
import '../vendor/sidenav-custom.css'

// TODO: Clean this up and charts button is broken
// TODO: Add a container component to hold the logic

class Navigator extends Component {
  render () {
    return (
      <div>
        <SideNav
          onSelect={selected => {
            // Add your code here

            switch (selected) {
              case 'Notes':
                break
              case 'charts':
                break
              case 'new':
                // Display Empty note to be edited
                // Show the new note with empty content and link
                this.setState(
                  {
                    view: false // closes existing document if present
                  },
                  () => this.props.newNote
                ) // callback to reset link and content and show view
                break
              default:
              // Nothing for now
            }
          }}>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="Notes">
            <NavItem eventKey="Notes">
              <NavIcon>
                <Note size="36" className="note-icon" />
              </NavIcon>
              <NavText>
                <div style={{ color: 'black' }}>My Notes</div>
              </NavText>
              <NavItem eventKey="Notes/list" />
              <NavItem>
                <NavText className="note-dropdown">
                  <NoteList
                    data={this.props.data}
                    sendLink={this.props.getLink}
                    stepNum={this.props.stepNum}
                    startNum={this.props.startNum}
                    subsetNum={this.props.subsetNum}
                  />
                  <DotsMobileStepper onStepClick={this.props.onStepClick} />
                </NavText>
              </NavItem>
              <NavItem eventKey="new">
                <NavText className="new-note-nav">
                  <span className="fromLeft">
                    New Note
                    <NoteAdd className="new-note" size="20" onClick={this.props.newNote} 
                    />
                  </span>
                </NavText>
              </NavItem>
            </NavItem>
            {/* <NavItem eventKey="charts">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: '1.75em' }}
                />
              </NavIcon>
              <NavText>Charts</NavText>
              <NavItem eventKey="charts/linechart">
                <NavText>Line Chart</NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText>Bar Chart</NavText>
              </NavItem>
            </NavItem> */}
          </SideNav.Nav>
        </SideNav>
      </div>
    )
  }
}

export default Navigator
