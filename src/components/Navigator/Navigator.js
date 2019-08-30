// sidenav from https://reactjsexample.com/react-side-nav-component/
import React, { Component } from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import NoteList from '../NoteList/NoteList.js'
import { Note } from 'styled-icons/boxicons-solid/Note'
import { NoteAdd } from 'styled-icons/material/NoteAdd'
import { ArrowDropDown } from 'styled-icons/material/ArrowDropDown'
import DotsMobileStepper from '../MobileStep/MobileStep.js'
import ClickOutside from '../../../node_modules/react-click-outside'
import styled from 'styled-components'
import '../Navigator/sidenav-custom.css'
import '../Navigator/Navigator.scss'

// TODO: Clean this up and charts button is broken
// TODO: Add a container component to hold the logic
// TODO: I may want to create a component to render the various lists of notes, their breadcrumbs, symbols and dropdowns

export const ConditionalDrop = styled(ArrowDropDown)`
  display: ${props => (props.expanded ? 'block' : 'none')}
`

class Navigator extends Component {
  constructor(props) {
    super(props)
     this.state = {
      expanded: false,
      subNavExpanded: false    
       
    }
  }
  componentDidUpdate(){
    this.state.expanded ? document.getElementById("nav-col").className = "expanded" : document.getElementById("nav-col").className = "collapsed";
  }
  
  sideNavExpand= () => {
    // this.subNavToggle(this.state.subNavExpanded)
    this.setState({ expanded: true })
    // this.forceUpdate()
  }
  
  subNavToggle = () => {
    this.setState({
      subNavExpanded: !this.state.subNavExpanded
    })
  }
  //REVIEW Factor out this component
  
  render () {
    
    // this.state.expanded ? document.getElementById("nav-col").className = "expanded" : document.getElementById("nav-col").className = "collapsed";
    return (
      <div>
        <ClickOutside
          onClickOutside={() => {
            this.setState({ expanded: false })
            // navColumn.style.minWidth = '64px';
          }}
          >
          <SideNav
            expanded={this.state.expanded}
            onToggle={(expanded) => {
              this.setState({ expanded })
              // let navColumn = document.querySelector("#nav-col"); 
              // navColumn.className += " expanded";
              // navColumn.style.minWidth = '350px';
            }}
            onSelect={selected => {
            // Add your code here
              switch (selected) {
                case 'Notes':
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
            <SideNav.Nav defaultSelected="Notes" onClick={this.sideNavExpand}>
              <NavItem eventKey="Notes" onClick={this.subNavToggle} expanded={this.state.subNavExpanded}>
                <NavIcon>
                  <Note size="34" className="note-icon" />
                </NavIcon>
                <NavText>
                  { this.state.expanded
                    ? <React.Fragment>
                      <ArrowDropDown size='20' className='arrowDrop' />
                      <div>
                    Notes
                      </div>
                    </React.Fragment>
                    : <div>
                    Notes
                    </div>}
                </NavText>
                <NavItem className='new-note-btn' eventKey="new">
                  <NavText className="new-note-nav">
                    <span className="fromLeft">
                    New Note
                      <NoteAdd className="new-note" size="20" onClick={this.props.newNote}
                      />
                    </span>
                  </NavText>
                </NavItem>
                    {/* REVIEW: Should I abstract this? */}
                <NavItem eventKey="Notes/list" />
                <NavItem className='notelist-container'>
                  <NavText className="note-dropdown">
                    { this.state.expanded
                      ? <NoteList
                      className = 'note-list-menu'
                      className = 'expanded'
                        data={this.props.data}
                        sendLink={this.props.getLink}
                      // stepNum={this.props.stepNum}
                      // startNum={this.props.startNum}
                      // subsetNum={this.props.subsetNum}
                      />

                      : <React.Fragment>
                        <NoteList
                          className = 'note-list-menu'
                          className = 'collapsed'
                          data={this.props.data}
                          sendLink={this.props.getLink}
                          stepNum={this.props.stepNum}
                          startNum={this.props.startNum}
                          subsetNum={this.props.subsetNum}
                        />
                        <DotsMobileStepper onStepClick={this.props.onStepClick} />
                      </React.Fragment>
                    }
                  </NavText>
                </NavItem>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </ClickOutside>
      </div>
    )
  }
}

export default Navigator
