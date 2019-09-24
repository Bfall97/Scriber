import React, { Component } from 'react'
import { Box, AccordionPanel, Accordion } from 'grommet'
import SideNav from '@trendmicro/react-sidenav'
import SideExplorerIconMenu from '../SideExplorerIconMenu/SideExplorerIconMenu'
import SideExplorerContentMenu from '../SideExplorerContentMenu/SideExplorerContentMenu'
import { FileDirectory } from 'styled-icons/octicons/FileDirectory'
import { Dropbox } from 'styled-icons/boxicons-logos/Dropbox'
import NoteList from '../NoteList/NoteList.js'
import { readFilesSync, defaultFolderRead } from '../../LocalFileSystem'
import '../SideExplorer/SideExplorer.scss'

const setting = require('electron').remote.require('electron-settings')

// TODO: Add loader for subnav lists.

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

  // TODO: DRY
  getContent = () => {
    if (this.state.activeMenu === 'local') {
      this.setState({ content:
        <Accordion margin={{ left: '50px' }}
        >
          <AccordionPanel
            label= 'Local Notes'
          >
            <NoteList
              className = 'note-list-menu'
              className = 'expanded'
              data={setting.get('filepaths.default') === '' ? null : readFilesSync(setting.get('filepaths.default'))}
              sendLink={this.props.getLink}
              connectorComponent={<button onClick={() => defaultFolderRead()}>Choose a Directory</button>}
              title='Local Notes'
            />
          </AccordionPanel>
        </Accordion>
      })
    } else if (this.state.activeMenu === 'dropbox') {
      this.setState({ content:
        <Accordion margin={{ left: '50px' }}
        >
          <AccordionPanel
            label= 'Dropbox Notes'
          >
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
          </AccordionPanel>
        </Accordion>
      })
    } else if (this.state.activeMenu === '') {
      this.setState({ content:
        <>
        <Accordion margin={{ left: '50px' }}
        >
          <AccordionPanel
            label= 'Local Notes'
          >
            <NoteList
              className = 'note-list-menu'
              className = 'expanded'
              data={setting.get('filepaths.default') === '' ? null : readFilesSync(setting.get('filepaths.default'))}
              sendLink={this.props.getLink}
              connectorComponent={<button onClick={() => defaultFolderRead()}>Choose a Directory</button>}
              title='Local Notes'
            />
          </AccordionPanel>
        </Accordion>
        <Accordion margin={{ left: '50px' }}
        >
          <AccordionPanel
            label= 'Dropbox Notes'
          >
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
          </AccordionPanel>
        </Accordion>
        </>
      })
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
                <SideNav.Toggle onClick={this.onToggle} style ={{ height: '34px', width: '46px', margin: '0 auto' }} />,
                <FileDirectory size={34} onClick={() => {
                  this.state.activeMenu === 'local'
                    ? this.setState({ activeMenu: '' }, () => { this.onToggle() })

                    : this.getActive('local')
                }} />,
                <Dropbox size={34} onClick={() => {
                  this.state.activeMenu === 'dropbox'
                    ? this.setState({ activeMenu: '' }, () => { this.onToggle() })

                    : this.getActive('dropbox')
                }} />
              ]}
              getActive = {this.getActive}
            />

            <SideExplorerContentMenu
              className='content-menu-container'
              navOpen = {this.state.open}
              active = {this.state.activeMenu}
            >
              {this.state.content}
            </SideExplorerContentMenu>

          </Box>
        </SideNav>
      </div>
    )
  }
}
