import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react'
import NoteDisplayContainer from './components/NoteDisplayContainer/NoteDisplayContainer'
import NavigatorContainer from './components/NavigatorContainer/Navigator-Container'
import Settings from './components/Settings/Settings';
import WelcomePage from './components/WelcomePage/welcome-page'
import SplitPane from 'react-split-pane'
import ClickOutside from '../node_modules/react-click-outside'
import SideExplorer from './components/SideExplorer/SideExplorer'

import { fileWrite, fileRead, defaultFolderRead, readFilesSync } from './LocalFileSystem.js'
import { handleDownloadRead, handleRead, downloadFileList } from './Dropbox.js'

import TitleBar from '../src/components/TitleBar/TitleBar.js'
import BottomBar from './components/BottomNav/BottomBar'
import Tooltip from '@material-ui/core/Tooltip'
import { Moon } from 'styled-icons/boxicons-regular/Moon'
import { Sun } from 'styled-icons/boxicons-regular/Sun'
import { Heart } from 'styled-icons/boxicons-regular/Heart'
import { Glasses } from 'styled-icons/fa-solid/Glasses'

import { Settings as SettingsIcon } from 'styled-icons/octicons/Settings'
import 'react-notifications/lib/notifications.css'
import '../src/vendor/App.css'

const notifications = require('react-notifications') // TODO: write typed definitions for this package.
const { NotificationContainer, NotificationManager } = notifications
const Dropbox = require('dropbox').Dropbox
const setting = require('electron').remote.require('electron-settings')


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // theme: 'dark',
      dropboxData: [],
      content: '',
      link: '',
      view: false,
      settingsView: false,
      saved: false,
      layout: '50%',
      navExpanded: false,
      viewHeight:
            Math.max(
              document.documentElement.clientHeight,
              window.innerHeight || 0
            ) - 120


    }
    this.toggleTheme = this.toggleTheme.bind(this)
  }

    // --------Get The Selected Note Link To Download--------------//
    //REVIEW I could put the logic to handle where the document is coming from here...
    getLink = link => {
      this.setState(
        {
          link: link,
          view: true
        })
      // ? Do I need this?
      // () => {
      // <NoteDisplayContainer
      // link={this.state.link}
      // layout={this.state.layout}
      // deletedNote={this.deletedNote}
      // />
      // }
    }

    getContent = content => {
      this.setState({
        content: content
      })
    }

    // -------List All Current Files in Dropbox Folder on Startup-----///
  componentDidMount () {
      this.updateDimensions()
      window.addEventListener('resize', this.updateDimensions.bind(this))
      
      console.log(setting.get('filepaths.default'))
      
      //REVIEW: Is this the best way to handle this?
      if(setting.get('filepaths.default')!== ''){
        // var localData = defaultFolderRead()
        this.setState({
          localData : readFilesSync(setting.get('filepaths.default'))
        })
      }
      //REVIEW Possibly deal with multiple source by adding them all into one here?
      // Possibly wont work because when I go to grab the file I wont know where to download from.
      //TODO: Add clause for if dropbox is empty but token is present
      // Cannot abstract this because I need to setState
      if(setting.get('tokens.dropbox')!== ''){
        var dbx = new Dropbox({
          fetch,
          accessToken: setting.get('tokens.dropbox')
        })
        dbx
          .filesListFolder({
            path: ''
          })
          .then(response => {
            this.setState({
              dropboxData: response.entries
            })
          })
          .catch(error => {
            console.log(error)
          })
      }

      
    }

    // -------Keeps ScreenHeight update in case of change------//
    updateDimensions () {
      this.setState({
        viewHeight:
          Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
          ) - 120
      })
    }

  // Handle Theme Change
  toggleTheme=(theme) => {
    this.setState({ theme })

    document.documentElement.setAttribute('data-theme', theme)
    console.log('switching themes...')
    document.documentElement.classList.add('theme-transition')
    document.documentElement.setAttribute('data-theme', theme)
    window.setTimeout(function () {
      document.documentElement.classList.remove('theme-transition')
    }, 800)
  }

  // TODO: User input of accessToken when Login/Sign up is done
  //TODO: Find a way to abstract dropbox stuff
  // DownloadFiles = () => {
  //   var dbx = new Dropbox({
  //     fetch,
  //     accessToken:
  //         'HqkVb2MBXGAAAAAAAAAAV0Lj4ZNMkt8jY9WnDMHbCOZjvzgpAG12Xy1WVzcWPHIK'
  //   })
  //   dbx
  //     .filesListFolder({
  //       path: ''
  //     })
  //     .then(response => {
  //       this.setState({
  //         dropboxData: response.entries
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // };

     // ----This function removes view of the note that was just deleted------//
     deletedNote = viewState => {
       this.setState({
         view: viewState
       })
       NotificationManager.info('Note Deleted')
       this.updateFiles() // signal re download
     };

  savedNote = () => {
    NotificationManager.success(
      'Note saved',
      'Save Successful',
      1500,
      null,
      true
    )
    this.updateFiles() // signal re download of list
  };

  updateFiles = () => {
        var dbx = new Dropbox({
      fetch,
      accessToken:
          setting.get('tokens.dropbox')
    })
    dbx
      .filesListFolder({
        path: ''
      })
      .then(response => {
        this.setState({
          dropboxData: response.entries
        })
      })
      .catch(error => {
        console.log(error)
      })
  };

      // -----Exit-----//
      onExit = () => {
        return this.setState({
          view: false,
          // Reset link to nothing, prevents old data from showing.
          link: '',
          content: ''
        })
      };

          // ----------Change Editor Layout Control-----------//
          layoutChange = mode => {
            switch (mode) {
              case 'edit':
                this.setState({
                  layout: '100%'
                })
                break
              case 'preview':
                this.setState({
                  layout: '0%'
                })
                break
              case 'split':
                this.setState({
                  layout: '50%'
                })
                break
              default:
                this.setState({
                  layout: '50%'
                })
            }
          }

          // -------Show an empty note, reset content and link on new note----//
          newNote= () => {
            this.setState({
              view: true, // show doc
              link: '', // reset link
              content: '' // reset content
            })
          }

          getExpansion = (expanded) =>{
            this.setState({
              navExpanded: expanded
            })
          }
                    
          render () {
            if (this.state.view === false) { //Welcome page on startup
              this.DownloadDisplay = 
              <WelcomePage 
              // REVIEW: Dropbox data for now, will later need to create new array for recent docs
                docList = {this.state.dropboxData} 
              /> 
            } else {
              this.DownloadDisplay = (
                <NoteDisplayContainer
                className='note-display'
                  subsetNum = {this.state.subsetNum}
                  stepNum={this.state.stepNum}
                  startNum={this.state.startNum}
                  view={this.state.view}
                  data={this.state.data}
                  link={this.state.link}
                  layout={this.state.layout}
                  getLink = {this.getLink}
                  getContent = {this.getContent}
                  savedNote = {this.savedNote}
                  deletedNote = {this.deletedNote}
                />
              )
            }

            if(this.state.settingsView === true){
              this.DownloadDisplay =
              <Settings
               />}

              console.log(this.state.navExpanded)


            return (
            <>
                <div className="App">
                  <CssBaseline />
                  <TitleBar /> 
                  <div id='content-container'>
                    <NotificationContainer />
                    <SplitPane 
                      split="vertical" 
                      size={this.state.navExpanded ? 350 : 50}
                      defaultSize={740}
                      position='static'
                      allowResize={this.state.navExpanded ? true : false}
                      style={'border:none'}
                      >
                    <div id='nav-col'>
                       <SideExplorer 
                       className='navigator'
                       subsetNum = {this.state.subsetNum}
                       stepNum={this.state.stepNum}
                       startNum={this.state.startNum}
                       view={this.state.view}
                       // data={this.state.data}
                       dropboxData={this.state.dropboxData}
                       localData={this.state.localData}
                       link={this.state.link}
                       layout={this.state.layout}
                       getLink = {this.getLink}
                       newNote={this.newNote}
                       getExpansion={this.getExpansion}
                       navExpanded={this.state.navExpanded}
                       /> 
                         {/* <NavigatorContainer
                          className='navigator'
                          subsetNum = {this.state.subsetNum}
                          stepNum={this.state.stepNum}
                          startNum={this.state.startNum}
                          view={this.state.view}
                          // data={this.state.data}
                          dropboxData={this.state.dropboxData}
                          localData={this.state.localData}
                          link={this.state.link}
                          layout={this.state.layout}
                          getLink = {this.getLink}
                          newNote={this.newNote}
                          getExpansion={this.getExpansion}
                          navExpanded={this.state.navExpanded}
                          /> */}
                    </div>
                    <div id='note-col'>
                    {this.DownloadDisplay}
                    </div>
                    </SplitPane>
                  </div>
                  <Tooltip title="Settings" aria-label="settings">
                      <SettingsIcon size='22' className='settings-button' onClick={()=>{this.setState({settingsView: !this.state.settingsView, view: false})}} />
                  </Tooltip>
                </div>
                  <BottomBar view={this.state.view} layoutChange = {this.layoutChange} onExit={this.onExit} />
                </>
            )
            
          }
}

export default App
