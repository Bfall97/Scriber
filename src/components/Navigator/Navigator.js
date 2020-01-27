// sidenav from https://reactjsexample.com/react-side-nav-component/
import React, { Component } from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import NoteList from '../NoteList/NoteList.js'
import { Note } from 'styled-icons/boxicons-solid/Note'
import { NoteAdd } from 'styled-icons/material/NoteAdd'
import { ArrowDropDown } from 'styled-icons/material/ArrowDropDown'
import { FileDirectory } from 'styled-icons/octicons/FileDirectory'
import { Dropbox } from 'styled-icons/boxicons-logos/Dropbox'

import DotsMobileStepper from '../MobileStep/MobileStep.js'
import NavigatorSection from '../Navigator/NavigatorSection/NavigatorSection'
import LocalNoteList from '../NoteList/LocalNoteList.js'
import DropboxNoteList from '../NoteList/DropBoxNoteList.js'
import NavSection from '../Navigator/NavigatorSection/NavSection'
import styled from 'styled-components'
import { fileWrite, fileRead, defaultFolderRead,readFilesSync } from '../../LocalFileSystem'
import { Accordion, AccordionPanel, Box } from 'grommet'

import '../Navigator/sidenav-custom.css'
import '../Navigator/Navigator.scss'

const setting = require('electron').remote.require('electron-settings')
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
      subNavExpanded: false,
      // NOTE: There is probably a better way to do this.
      localExpand: false,
      dropboxExpand: false,
       
    }
  }
  componentDidUpdate(){
    this.state.expanded 
    ? 
    ()=>{ 
    document.getElementById("nav-col").className = "expanded" 
      this.props.getExpansion(true)
    }
    :
    ()=>{
     document.getElementById("nav-col").className = "collapsed"
     this.props.getExpansion(false)
    }
  }
  
  
  sideNavExpand= () => {
    this.setState({ expanded: true })
  }
  
  subNavToggle = () => {
    this.setState({
      subNavExpanded: !this.state.subNavExpanded
    })
  }  
  
  render () {

    return (
        
      <div>
          <SideNav
            expanded={this.state.expanded}
            onToggle={() => {
              this.setState({ expanded: !this.state.expanded })
              this.props.getExpansion(()=>{this.state.expanded})
              this.state.expanded ? this.props.getExpansion(false) : this.props.getExpansion(true)
            }}
            
            onSelect={selected => {
            // Add your code here
              switch (selected) {
                // Only one appears at a time.
                case 'Local Notes':
                  this.setState({
                    localExpand: true,
                    dropboxExpand: false
                  })
                  break
                case 'Dropbox Notes':
                  this.setState({
                    dropboxExpand: true,
                    localExpand: false
                })
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
            <SideNav.Toggle
           
            />
            <SideNav.Nav onClick={this.sideNavExpand} expanded={this.state.expanded}>
            <Accordion animate={true} multiple={true} margin='small'
              style={{width:'90%', justifyContent:'left', margin:'2px', float:'left', alignContent: 'left'}}
              alignContent='start'
              >
            <NavItem eventKey="Local Notes"
            onClick = {this.state.expanded === false ? 
                      ()=>{          
                        this.sideNavExpand
                        this.props.getExpansion(true)
                        }
                      : null
                    }
            >
              {/* <AccordionPanel label='Local Notes'> */}
          { setting.get('filepaths.default') !== '' 
            ?
              <NavSection 
                sideNavExpanded ={this.state.expanded}
                subNavExpanded={this.state.localExpand}
                filepath={setting.get('filepaths.default')}
                getLink={this.props.getLink}
                sourceTitle='Local'
                getExpansion={this.props.getExpansion}
                sourceIcon = {<FileDirectory size='32' className='note-icon'/>}>
                  <LocalNoteList  
                    className = 'note-list-menu'
                    className = 'expanded'
                    data={readFilesSync(setting.get('filepaths.default'))}
                    sendLink={this.props.getLink} /> }
                    />
              </NavSection>
            :
            <NavSection 
            sideNavExpanded ={this.state.expanded}
            subNavExpanded={this.state.localExpand}
              getLink={this.props.getLink}
              sourceTitle='Local'
              getExpansion={this.props.getExpansion}
              sourceIcon = { <FileDirectory size="32" className="note-icon" />}
              connectorComponent={<button onClick={()=>defaultFolderRead()}>Choose a Directory</button>}
            /> }
            {/* </AccordionPanel> */}
            </NavItem>
            {/* <AccordionPanel label='Dropbox Notes'> */}
              <NavItem eventKey="Dropbox Notes" 
                 onClick = {this.state.expanded === false ? 
                  ()=>{          
                    this.sideNavExpand
                    this.props.getExpansion(true)
                    }
                  : null
                }>

              {setting.get('tokens.dropbox') !== '' 
              ?
                <NavSection
                sideNavExpanded ={this.state.expanded}
                  subNavExpanded = {this.state.dropboxExpand}
                  getLink={this.props.getLink}
                  sourceTitle='Dropbox'
                  getExpansion={this.props.getExpansion}
                  getExpansion={this.props.getExpansion}
                  sourceIcon = { <Dropbox size="34" className="note-icon" />}
                  // noteListComponent = {}
                >
                   <DropboxNoteList  
                    className = 'note-list-menu'
                    className = 'expanded'
                    data={this.props.dropboxData}
                    sendLink={this.props.getLink}
                    subsetNum = {this.props.subsetNum}
                    stepNum={this.props.stepNum}
                    startNum={this.props.startNum} />
                </NavSection>
              :
              <NavSection
              sideNavExpanded ={this.state.expanded}
              subNavExpanded={this.state.dropboxExpand}
                sourceTitle='Dropbox'
                getExpansion={this.props.getExpansion}
                sourceIcon = { <Dropbox size="34" className="note-icon" />}
                connectorComponent={<button>Connect Your Dropbox Account</button>}
              />}
              </NavItem>
              {/* </AccordionPanel> */}
              </Accordion>
            </SideNav.Nav>
          </SideNav>
      </div>
    )
  }
}

export default Navigator
