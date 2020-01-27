import React, { Component } from "react";
import { Box } from 'grommet'
import SideNav from '@trendmicro/react-sidenav'
import SideExplorerIconMenu from '../SideExplorerIconMenu/SideExplorerIconMenu'
import SideExplorerContentMenu from '../SideExplorerContentMenu/SideExplorerContentMenu'
import { readFilesSync, defaultFolderRead } from '../../LocalFileSystem'
import ExplorerContent from './ExplorerContent'
import '../SideExplorer/SideExplorer.scss'


class Explorer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      activeMenu: '',
      content: null,
      isLoading: false
    }
  }

  getActive = (menuItem) => this.setState({ activeMenu: menuItem, open: true }, () => this.props.getExpansion(this.state.open))
  
  onToggle = () => {
    this.setState({ open: !this.state.open }, () => this.props.getExpansion(this.state.open))
  }

  setActive = (menuItem) => {
   this.state.activeMenu === menuItem
                      ? this.setState({ activeMenu: "" }, () => {
                          this.onToggle();
                        })
                      : this.getActive(menuItem);
  }

  handleDefaultDir = () => {
    defaultFolderRead()
  }

// This component does not auto update after selecting a directory. Fix!

  render() {
    return (
      <div>
        <SideNav>
          <Box
            className="explorer-container"
            fill="horizontal"
            direction="column"
            alignContent="start">
              <SideExplorerContentMenu
                className="content-menu-container"
                navOpen={this.state.open}
                active={this.state.activeMenu}
                activeMenu={this.state.activeMenu}
                getActive = {this.getActive}
                setActive={this.setActive}
                onToggle = {this.onToggle}>
                  {/* {this.state.content} */} 
                  <ExplorerContent 
                    label='Local Notes'
                    getLink = {this.props.getLink}
                    getContent = {this.props.getContent}
                    getDocument = {this.props.getDocument}
                    connectingComponent = {<button onClick={() => this.handleDefaultDir()}>Choose a Default Directory</button>}
                  />
              </SideExplorerContentMenu>
          </Box>
        </SideNav>
      </div>
    );
  }
}

export default Explorer;
