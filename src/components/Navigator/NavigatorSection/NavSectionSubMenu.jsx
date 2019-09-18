import React from 'react'
import { NoteAdd } from 'styled-icons/material/NoteAdd'
import { NavItem } from '@trendmicro/react-sidenav'

const NavSectionSubMenu = (props) => {
  return (
    <div>
      {
        props.connectorComponent !== undefined

          ? props.connectorComponent
          : <div>
            <NavItem eventKey="Notes/list" >
              <div className='notelist-container'>
                <NavItem>
                  <div className='note-dropdown'>
                    <NavItem>
                      {props.child}
                      <div className='new-note-nav'>
                        <span className="fromLeft">
                                  New Note
                          <NoteAdd className="new-note" size="20" onClick={props.newNote}/>
                        </span>
                      </div>
                    </NavItem>
                  </div>
                </NavItem>
              </div>
            </NavItem>
          </div>
      }
    </div>
  )
}

export default NavSectionSubMenu
