import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react'
import NoteDisplayContainer from './components/NoteDisplayContainer/NoteDisplayContainer'
import NavigatorContainer from './components/NavigatorContainer/Navigator-Container'
import Settings from './components/Settings/Settings';
import WelcomePage from './components/WelcomePage/welcome-page'
// import TopNav from './components/TopNav/TopNav'

import { fileWrite, fileRead, defaultFolderRead } from './LocalFileSystem.js'

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
      data: [],
      content: '',
      link: '',
      view: false,
      settingsView: false,
      saved: false,
      layout: '50%',
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
      
      
      //REVIEW: Is this the best way to handle this?
      if(setting.get('filepaths.default')!== ''){
        defaultFolderRead()
      }
      
      //REVIEW Possibly deal with multiple source by adding them all into one here?
      // Possibly wont work because when I go to grab the file I wont know where to download from.
      if(setting.get('tokens.dropbox')!== ''){
        this.DownloadFiles() 
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
  DownloadFiles = () => {
    var dbx = new Dropbox({
      fetch,
      accessToken:
          'HqkVb2MBXGAAAAAAAAAAV0Lj4ZNMkt8jY9WnDMHbCOZjvzgpAG12Xy1WVzcWPHIK'
    })
    dbx
      .filesListFolder({
        path: ''
      })
      .then(response => {
        this.setState({
          data: response.entries
        })
      })
      .catch(error => {
        console.log(error)
      })
  };

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
    this.DownloadFiles() // You probably need to change this too
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

          render () {
            if (this.state.view === false) { //Welcome page on startup
              this.DownloadDisplay = 
              <WelcomePage 
                docList = {this.state.data}
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

            return (
            <>
                <div className="App">
                  <CssBaseline />
                  <TitleBar /> 
                  <div id='content-container'>
                    {/* <TopNav /> */}
                    <NotificationContainer />
                    {/* <div className='themeIcon'>{ThemeIcons}</div> */}      
                    <div id='nav-col'>
                      <NavigatorContainer
                        className='navigator'
                        subsetNum = {this.state.subsetNum}
                        stepNum={this.state.stepNum}
                        startNum={this.state.startNum}
                        view={this.state.view}
                        data={this.state.data}
                        link={this.state.link}
                        layout={this.state.layout}
                        getLink = {this.getLink}
                        newNote={this.newNote}
                        />
                    </div>
                    {/* until I know what I am doing I am postponing this segment of development */}
                    <div id='note-col'>
                    {this.DownloadDisplay}
                    </div>
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
