import React, { Component } from 'react'
import { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import { NoteAdd } from 'styled-icons/material/NoteAdd'
// import { DropBoxNoteList } from '../../NoteList/DropBoxNoteList.js'
import NoteList from '../../NoteList/NoteList.js'
import '../../Navigator/sidenav-custom.css'
import '../../Navigator/Navigator.scss'


export default class NavigatorSection extends Component {
    constructor(props) {
        super(props)
    }    

    
    render() {
        return (
          <>
                  <NavItem eventKey="Notes/list" >
                 <NavItem className='notelist-container'>
                  <NavText className="note-dropdown">
                    { this.props.expanded
                      ? <NoteList
                        className = 'note-list-menu'
                        className = 'expanded'
                        data={this.props.data}
                        sendLink={this.props.getLink}
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
                        {/* <DotsMobileStepper onStepClick={this.props.onStepClick} /> */}
                      </React.Fragment>
                    }
                  </NavText>
                </NavItem>
              </NavItem>
            </>
        )
    }
}
