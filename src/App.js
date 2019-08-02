import React, { Component } from 'react'
import NoteDisplayContainer from './components/NoteDisplayContainer/NoteDisplayContainer'
import NavigatorContainer from './components/NavigatorContainer/Navigator-Container'
// import TopNav from './components/TopNav/TopNav'
// import TitleBar from '../src/components/TitleBar/TitleBar.js'
import BottomBar from './components/BottomNav/BottomBar'
import { Moon } from 'styled-icons/boxicons-regular/Moon'
import { Sun } from 'styled-icons/boxicons-regular/Sun'
import { Heart } from 'styled-icons/boxicons-regular/Heart'
import { Glasses } from 'styled-icons/fa-solid/Glasses'

import 'react-notifications/lib/notifications.css'
import '../src/vendor/App.css'

const notifications = require('react-notifications') // TODO: write typed definitions for this package.
const { NotificationContainer, NotificationManager } = notifications
const Dropbox = require('dropbox').Dropbox

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: 'dark',
      data: [],
      content: '',
      link: '',
      view: false,
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
    // TODO: Later change this to if dropbox exists, then download.
    componentDidMount () {
      this.updateDimensions()
      window.addEventListener('resize', this.updateDimensions.bind(this))

      this.DownloadFiles()
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
            if (this.state.view === false) {
              this.DownloadDisplay = null
            } else {
              this.DownloadDisplay = (
                <NoteDisplayContainer
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

            // Which icon to display
            const ThemeIcons =
      <React.Fragment>
        <Moon dark onClick={() => this.toggleTheme('dark')} size='22' className='dark-theme'/>
        <Sun light onClick={() => this.toggleTheme('light')} size='22'className='light-theme' />
        <Heart light onClick={() => this.toggleTheme('femme')} size='22'className='femme-theme' />
        <Glasses light onClick={() => this.toggleTheme('office')} size='22'className='office-theme' />
      </React.Fragment>

            return (

              <div className="App">
                {/* <TitleBar />  */}
                {/* <TopNav /> */}
                <NotificationContainer />
                {/* <div className='themeIcon'>{ThemeIcons}</div> */}
                <NavigatorContainer
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
                {this.DownloadDisplay}
                <BottomBar view={this.state.view} layoutChange = {this.layoutChange} onExit={this.onExit} />
              </div>
            )
          }
}

export default App
