
import React, { Component } from 'react'
import { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import { ArrowDropDown } from 'styled-icons/material/ArrowDropDown'

import NoteList from '../../NoteList/NoteList.js'
import styled from 'styled-components'
import NavSectionSubMenu from './NavSectionSubMenu.jsx'
import '../../Navigator/sidenav-custom.css'
import '../../Navigator/Navigator.scss'
import '../NavigatorSection/NavigatorSection.scss'
import { FastRewind } from 'styled-icons/material'

export const ConditionalDrop = styled(ArrowDropDown)`
  display: ${props => (props.expanded ? 'block' : 'none')}
`
const navDisplay = 'nav-display-none';

export default class NavSection extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      subNavExpand : false
    }
    
  }

  viewToggle = () => {
    this.navDisplay = 'nav-display'
  }

  
  render() {
    if(!this.props.sideNavExpanded) ()=>this.setState({subNavExpand:false})

    const NavSectionExpanded = (
                          <NavItem className='focused-menu' expanded={this.state.view}>
                            <div onClick={this.viewToggle} className={this.navDisplay}>
                              <NavItem >
                              <ArrowDropDown size='20' className='arrowDrop-collapsed' />

                              {this.props.sourceTitle} Notes

                              <NavSectionSubMenu 
                              child={this.props.children}
                              connectorComponent={this.props.connectorComponent}
                              newNote={this.props.newNote}
                              />

                              </NavItem>
                            </div>
                          </NavItem>)


    const NavSectionCollapsed = this.props.sideNavExpanded ? 
    (
      <div expanded={this.state.view} className={'unfocused-menu'}>
          <ArrowDropDown size='20' className='arrowDrop' />
          {this.props.sourceTitle} Notes
          <p className='filepath-string'><em>{this.props.filepath}</em></p>
      </div>
    )
    :
    null

    return (
        <div 
          onClick={
              ()=>this.setState({subNavExpand : !this.state.subNavExpand})
            }
        >
          <NavItem expanded={this.state.subNavExpand}>
                  {/* Icon */}
                  <NavIcon className='section-icon'>
                      {this.props.sourceIcon}
                  </NavIcon>

                    {/* Dropdown Content */}
                  <NavText className='dropdown-content-container'className={this.navDisplay}>
                    { 
                        this.state.subNavExpand === false
                    ? 
                      NavSectionCollapsed
                    : 
                      NavSectionExpanded
                    }
                  </NavText>
            </NavItem>
      </div>
      
    )
  }
}
