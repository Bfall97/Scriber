<<<<<<< HEAD
import React from 'react'
import { Box, AccordionPanel, Accordion } from 'grommet'
import './SideExplorerContentMenu.scss'

// Grab Theme Colours for Accordion

const SideExplorerContentMenu = (props) => {
   

    return (
        props.navOpen ? 
        <Box fill='horizontal' className='content-menu-box'>
        {/* <Accordion margin={{"left":"50px"}}
        > 
            <AccordionPanel 
                style={{textTransform: 'capitalize'}}
                label= { props.active + " Notes"}
                alignSelf='center'
            > */}
                {props.children}
            {/* </AccordionPanel> */}
        {/* </Accordion> */}
        </Box>
        :
        null
    )
=======
import React, { Component } from 'react'
import SideNav from '@trendmicro/react-sidenav'
import SideExplorerIconMenu from '../SideExplorerIconMenu/SideExplorerIconMenu'
import { Box, Accordion } from 'grommet'
import { FileDirectory } from 'styled-icons/octicons/FileDirectory'
import { Dropbox } from 'styled-icons/boxicons-logos/Dropbox'

import './SideExplorerContentMenu.scss'
import '../SideExplorerIconMenu/IconMenu.scss'

// Grab Theme Colours for Accordion
class SideExplorerContentMenu extends Component {
// const SideExplorerContentMenu = (this.props) => {
constructor(props) {
  super(props);
  this.state = {
    children: null
  }
  this.setState({children : this.props.children})
}


  render(){
    return (
        this.props.navOpen ?
        <>
        <SideExplorerIconMenu
            icons = {[
                <SideNav.Toggle
                  onClick={this.props.onToggle}
                  style={{ height: "34px", width: "46px", margin: "0 auto" }}
                />,
                <FileDirectory
                  size={34}
                  onClick={() => {
                    this.props.setActive("local")
                  }}
                />,
                <Dropbox
                  size={34}
                  onClick={() => {
                    this.props.activeMenu === "dropbox"
                      ? this.setState({ activeMenu: "" }, () => {
                          this.props.onToggle();
                        })
                      : this.props.getActive("dropbox");
                  }}
                />
              ]}
        /> 
        <Box fill='horizontal' className={['content-menu-box', 'expanded'].join(' ')} margin={{left: "50px"}}>
          <Accordion 
              style={{textTransform: 'capitalize', width: "95%"}}
              alignSelf='center'>
                 {this.props.children}
          </Accordion>
        </Box>
        </>
        :
        <SideExplorerIconMenu 
            icons = {[
                <SideNav.Toggle
                  onClick={this.props.onToggle}
                  style={{ height: "34px", width: "46px", margin: "0 auto" }}
                />,
                <FileDirectory
                  size={34}
                  onClick={() => {
                      this.props.setActive('local')
                  }}
                />,
                <Dropbox
                  size={34}
                  onClick={() => {
                    this.props.activeMenu === "dropbox"
                      ? this.setState({ activeMenu: "" }, () => {
                          this.props.onToggle();
                        })
                      : this.props.getActive("dropbox");
                  }}
                />
              ]}
        />
    )
  }
>>>>>>> 815dd7e... Massive Revision for the project
}

export default SideExplorerContentMenu
