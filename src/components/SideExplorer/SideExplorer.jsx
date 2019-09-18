// sidenav from https://reactjsexample.com/react-side-nav-component/t-sidenav'
import React, { Component } from 'react'
import { Box } from 'grommet'
import SideNav from '@trendmicro/react-sidenav'
import SideExplorerIconMenu from '../SideExplorerIconMenu/SideExplorerIconMenu'
import SideExplorerContentMenu from '../SideExplorerContentMenu/SideExplorerContentMenu'
import { FileDirectory } from 'styled-icons/octicons/FileDirectory'
import { Dropbox } from 'styled-icons/boxicons-logos/Dropbox'
import NoteList from '../NoteList/NoteList.js'
import { readFilesSync, defaultFolderRead } from '../../LocalFileSystem'
import '../SideExplorer/SideExplorer.scss'
// import { Note } from 'styled-icons/boxicons-solid/Note'
// import { NoteAdd } from 'styled-icons/material/NoteAdd'
// import { ArrowDropDown } from 'styled-icons/material/ArrowDropDown'
// import DotsMobileStepper from '../MobileStep/MobileStep.js'
// import NavigatorSection from '../Navigator/NavigatorSection/NavigatorSection'
// import LocalNoteList from '../NoteList/LocalNoteList.js'
// import DropboxNoteList from '../NoteList/DropBoxNoteList.js'
// import NavSection from '../Navigator/NavigatorSection/NavSection'
// import styled from 'styled-components'
const setting = require('electron').remote.require('electron-settings')

export default class SideExplorer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      activeMenu: '',
      content: null
    }
  }

  componentWillReceiveProps () {
    this.getContent()
  }

  onToggle = () => {
    this.setState({ open: !this.state.open }, () => this.props.getExpansion(this.state.open))
  }

  getContent = () => {
    if (this.state.activeMenu === 'local') {
      this.setState({ content:
        <NoteList
          className = 'note-list-menu'
          className = 'expanded'
          data={setting.get('filepaths.default') === '' ? null : readFilesSync(setting.get('filepaths.default'))}
          sendLink={this.props.getLink}
          connectorComponent={<button onClick={() => defaultFolderRead()}>Choose a Directory</button>}
          title='Local Notes'
        />
      })
    } else if (this.state.activeMenu === 'dropbox') {
      this.setState({ content:
        <NoteList
          className = 'note-list-menu'
          className = 'expanded'
          data={setting.get('tokens.dropbox') === '' ? null : this.props.dropboxData}
          sendLink={this.props.getLink}
          subsetNum = {this.props.subsetNum}
          stepNum={this.props.stepNum}
          startNum={this.props.startNum}
          connectorComponent={<button>Connect Your Dropbox Account</button>}
          title='Dropbox Notes'
        />
      })
    } else {
      this.setState({ content: null })
    }
  }

  getActive = (menuItem) => this.setState({ activeMenu: menuItem, open: true }, () => this.props.getExpansion(this.state.open))

  render () {
    return (
      <div>
        <SideNav>
          <Box className ='explorer-container'fill='horizontal' direction='column' alignContent='start'>
            <SideExplorerIconMenu
              className='icon-menu-container'
              icons = {[
                <SideNav.Toggle onClick={this.onToggle} style ={{ height: '34px' }} />,
                <FileDirectory size={34} onClick={() => { this.getActive('local') }} />,
                <Dropbox size={34} onClick={() => { this.getActive('dropbox') }} />
              ]}
              getActive = {this.getActive}
            />

            <SideExplorerContentMenu
              className='content-menu-container'
              navOpen = {this.state.open}
            >
              {this.state.content}
            </SideExplorerContentMenu>

          </Box>
        </SideNav>
      </div>
    )
  }
}
