<<<<<<< HEAD
<<<<<<< HEAD
=======
import 'react-notifications/lib/notifications.css'
import '../src/vendor/App.css'

import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline'
import TitleBar from "../src/components/TitleBar/TitleBar.js";
import SplitPane from 'react-split-pane'
import WelcomePage from './components/WelcomePage/welcome-page'
import Settings from '../src/components/Settings/Settings';
import NoteDisplayContainer from './components/NoteDisplayContainer/NoteDisplayContainer'
import { Settings as SettingsIcon } from 'styled-icons/octicons/Settings'
import Explorer from './components/SideExplorer/Explorer'
import BottomBar from './components/BottomNav/BottomBar'
import Tooltip from '@material-ui/core/Tooltip'
import { fileUpdate, openFile, fileWrite, fileDelete, getStats } from './LocalFileSystem.js'

const notifications = require('react-notifications')
const { NotificationContainer, NotificationManager } = notifications
const setting = require('electron').remote.require('electron-settings')



class App extends Component {

=======
>>>>>>> 72b801b768fc8c43b00521d7103a0d253d50f15b
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component, useRef } from 'react'
import NoteDisplayContainer from './components/NoteDisplayContainer/NoteDisplayContainer'
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
<<<<<<< HEAD
=======
import 'react-notifications/lib/notifications.css'
import '../src/vendor/App.css'

import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline'
import TitleBar from "../src/components/TitleBar/TitleBar.js";
import SplitPane from 'react-split-pane'
import WelcomePage from './components/WelcomePage/welcome-page'
import Settings from '../src/components/Settings/Settings';
import NoteDisplayContainer from './components/NoteDisplayContainer/NoteDisplayContainer'
import { Settings as SettingsIcon } from 'styled-icons/octicons/Settings'
import Explorer from './components/SideExplorer/Explorer'
import BottomBar from './components/BottomNav/BottomBar'
import Tooltip from '@material-ui/core/Tooltip'
import { fileUpdate, openFile, fileWrite, fileDelete, getStats } from './LocalFileSystem.js'

const notifications = require('react-notifications')
const { NotificationContainer, NotificationManager } = notifications
const setting = require('electron').remote.require('electron-settings')



class App extends Component {

>>>>>>> 815dd7e... Massive Revision for the project
=======
>>>>>>> c1923cc73491294e0ad84a68eba40b0fe37a0097
>>>>>>> 72b801b768fc8c43b00521d7103a0d253d50f15b
  constructor (props) {
    super(props)
    this.state = {
      // theme: 'dark',
      dropboxData: [],
      localData:[],
      recentDocuments: [],
      content: '',
      link: '',
      view: false,
      settingsView: false,
      saved: false,
      layout: '50%',
      navExpanded: false,
      document: {},
      viewHeight:Math.max(
                  document.documentElement.clientHeight,
                  window.innerHeight || 0
                ) - 120
    }
     
    this.paneWidth = React.createRef()
    this.toggleTheme = this.toggleTheme.bind(this)
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
  componentDidMount=()=>{
    if (setting.get('recentDocs.recentDocs') && setting.get('recentDocs.recentDocs').length) {
      let docs = setting.get('recentDocs.recentDocs')
      this.setState({recentDocuments:docs})
    } // Load Recent Docs if available
  }

  // Toggle Theme Change
=======
>>>>>>> 72b801b768fc8c43b00521d7103a0d253d50f15b
    // --------Get The Selected Note Link To Download--------------//
    getLink = data => {
      // data = JSON.parse(data)

      // Set the document object in state
      this.setState({
        document:data
      })


      //NOTE sometimes its setting.get('recentDocs.recentDocs.recentDocs'), 
          //and sometimes its setting.get('recentDocs.recentDocs') i dont know why
      if (setting.get('recentDocs.recentDocs.recentDocs') !== undefined){
        var recentDocs = setting.get('recentDocs.recentDocs.recentDocs')
      }else if( setting.get('recentDocs.recentDocs') !== undefined){
        var recentDocs = setting.get('recentDocs.recentDocs')
      }

      //Push the document to the recent docs list 
      if (recentDocs.length == 3) {recentDocs.shift()}
      recentDocs.push(data)
      setting.set('recentDocs.recentDocs',recentDocs)
      this.setState(
        {
          link: data.path,
          recentDocuments: recentDocs,
          view: true
        })
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
      
      
      //NOTE may have to move this to componentDidUpdate or something
      if (setting.get('recentDocs.recentDocs') && setting.get('recentDocs.recentDocs').length) {
        let docs = setting.get('recentDocs.recentDocs')
        this.setState({
          recentDocuments : docs
        })
      }else{
        setting.set('recentDocs.recentDocs',{
          recentDocs: this.state.dropboxData
        })
        this.setState({
          recentDocuments : this.state.dropboxData
        })
      }
      
      //REVIEW: Is this the best way to handle this?
      if(setting.get('filepaths.default')!== ''){
        this.setState({
          localData : readFilesSync(setting.get('filepaths.default'))
        })
      }
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
<<<<<<< HEAD
=======
  componentDidMount=()=>{
    if (setting.get('recentDocs.recentDocs') && setting.get('recentDocs.recentDocs').length) {
      let docs = setting.get('recentDocs.recentDocs')
      this.setState({recentDocuments:docs})
    } // Load Recent Docs if available
  }

  // Toggle Theme Change
>>>>>>> 815dd7e... Massive Revision for the project
=======
>>>>>>> c1923cc73491294e0ad84a68eba40b0fe37a0097
>>>>>>> 72b801b768fc8c43b00521d7103a0d253d50f15b
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
  // Set SideNav Expansion 
  getExpansion = (expanded) =>{
    this.setState({
      navExpanded: expanded
    })
    console.log(this.state.navExpanded)
  }

  getLink = (link) => {
    this.setState({link:link})
  }

  // Set the document object in state
    getDocument = data => {
      let doc;
      doc = data
      doc.stats = getStats(data.local_path)
    this.setState({
      document:doc,
      link: data.local_path,
      content: openFile(data.local_path)
    },()=>{
        this.addRecent(this.state.document)
      })
  }

  addRecent = (doc) =>{ 
    let recentDocs;
    if( setting.get('recentDocs.recentDocs') !== undefined){
      recentDocs = setting.get('recentDocs.recentDocs')
    }
  
    //Push the document to the recent docs list 
    if (recentDocs.length === 3) {recentDocs.shift()}
    recentDocs.push(doc)
    setting.set('recentDocs.recentDocs',recentDocs)
    this.setState(
      {
        recentDocuments: recentDocs,
        view: true
      })
      console.log('recentDocs',this.state.recentDocuments)
  }

  //Get content from file, set it in state
  getContent=(cont)=>{
    this.setState({content: cont})
  }

  //-----Save----//
  onSave= async ()=>{ // MAKE ASYNC    
    console.log(this.state.link)
    
    this.state.link === '' ?
      this.setState({link: fileWrite(this.state.content)})
        
    :
      fileUpdate(this.state.link, this.state.content)
      
    await NotificationManager.success(
      'Note saved',
      'Save Successful',
      1500,
      null, 
      true
    )
  }

  //-----Delete-----//
  onDelete = () => {
    const confirmPrompt = window.confirm('Are you sure you want to delete this note?')

    if (confirmPrompt === true) {
      fileDelete(this.state.link)
    }
    this.setState({
      view: false
    })
    NotificationManager.info('Note Deleted')
  }


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

      settingsScreen = () => {
        this.setState({settingsView: !this.state.settingsView, view: false})
      }

  render() {
    if (this.state.settingsView){this.DownloadDisplay = <Settings settingsScreen={this.settingsScreen}/>}
    else if(this.state.view === false){
      this.DownloadDisplay = 
        <WelcomePage  
          docList = {this.state.recentDocuments}
          getDoc={this.getDocument}
          sendLink = {this.getLink}
          newNote = {this.newNote}
          settingsScreen = {this.settingsScreen}/>}
    else if (this.state.view === true){
      this.DownloadDisplay = 
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
          savedNote = {this.onSave}
          onDelete = {this.onDelete}
          document={this.state.document}/>
    }
    return (
      <>
      <CssBaseline >
        <TitleBar className="title-bar" />
        <div className="App">
          <div id="content-container">
            <NotificationContainer />
            <SplitPane
              minSize={225}
              ref={this.paneWidth}
              id='main-split-pane' 
              split="vertical" 
              size={this.state.navExpanded ? 300 : 50}
              defaultSize={740}
              position='static' 
              allowResize={this.state.navExpanded ? true : false}>
                <div id="nav-col">
                  <Explorer 
                    getExpansion={this.getExpansion}
                    getDocument = {this.getDocument}
                  />
                </div>
                <div id="note-col">
                  {this.DownloadDisplay}
                </div>
            </SplitPane>
          </div>
            <Tooltip title="Settings" aria-label="settings">
                  <SettingsIcon size='24' className='settings-button' onClick={this.settingsScreen} />
            </Tooltip>
        </div>
          <BottomBar view={this.state.view} layoutChange = {this.layoutChange} onExit={this.onExit} />
        </CssBaseline>
      </>
    );
  }
}

export default App;
=======
>>>>>>> 72b801b768fc8c43b00521d7103a0d253d50f15b
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
    if(setting.get('filepaths.default')!== ''){
      this.setState({
        localData : readFilesSync(setting.get('filepaths.default'))
      })
    }
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
          this.forceUpdate()
        })
        .catch(error => {
          console.log(error)
        })
    }
    this.forceUpdate()
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

          settingsScreen = () => {
            this.setState({settingsView: !this.state.settingsView, view: false})
          }
                    
          render () {
            if (this.state.view === false) { //Welcome page on startup
              this.DownloadDisplay = 
              <WelcomePage 
                docList = {this.state.recentDocuments}
                sendLink = {this.getLink}
                newNote = {this.newNote}
                settingsScreen = {this.settingsScreen}
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
                  document={this.state.document}
                />
              )
            }

            if(this.state.settingsView === true){
              this.DownloadDisplay =
              <Settings
                settingsScreen={this.settingsScreen}
               />}
            return (
            <>
                <CssBaseline>
                <TitleBar className='title-bar' /> 
                <div className="App">
                  <div id='content-container'>
                    <NotificationContainer />
                    <SplitPane
                      minSize={225}
                      ref={ this.paneWidth }
                      id='main-split-pane'
                      split="vertical" 
                      size={ 
                        this.state.navExpanded ? 300 :50 // Default Navbar open/close size
                      }
                      defaultSize={740}
                      position='static'
                      allowResize={this.state.navExpanded ? true : false}
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
                       updateList={this.updateFiles}
                       /> 
                    </div>
                    <div id='note-col'>
                    {this.DownloadDisplay}
                    </div>
                    </SplitPane>
                  </div>
                  <Tooltip title="Settings" aria-label="settings">
                      <SettingsIcon size='24' className='settings-button' onClick={this.settingsScreen} />
                  </Tooltip>
                </div>
                <BottomBar view={this.state.view} layoutChange = {this.layoutChange} onExit={this.onExit} />
                </CssBaseline>
                </>
            )
            
          }
=======
  // Set SideNav Expansion 
  getExpansion = (expanded) =>{
    this.setState({
      navExpanded: expanded
    })
    console.log(this.state.navExpanded)
  }

  getLink = (link) => {
    this.setState({link:link})
  }

  // Set the document object in state
    getDocument = data => {
      let doc;
      doc = data
      doc.stats = getStats(data.local_path)
    this.setState({
      document:doc,
      link: data.local_path,
      content: openFile(data.local_path)
    },()=>{
        this.addRecent(this.state.document)
      })
  }

  addRecent = (doc) =>{ 
    let recentDocs;
    if( setting.get('recentDocs.recentDocs') !== undefined){
      recentDocs = setting.get('recentDocs.recentDocs')
    }
  
    //Push the document to the recent docs list 
    if (recentDocs.length === 3) {recentDocs.shift()}
    recentDocs.push(doc)
    setting.set('recentDocs.recentDocs',recentDocs)
    this.setState(
      {
        recentDocuments: recentDocs,
        view: true
      })
      console.log('recentDocs',this.state.recentDocuments)
  }

  //Get content from file, set it in state
  getContent=(cont)=>{
    this.setState({content: cont})
  }

  //-----Save----//
  onSave= async ()=>{ // MAKE ASYNC    
    console.log(this.state.link)
    
    this.state.link === '' ?
      this.setState({link: fileWrite(this.state.content)})
        
    :
      fileUpdate(this.state.link, this.state.content)
      
    await NotificationManager.success(
      'Note saved',
      'Save Successful',
      1500,
      null, 
      true
    )
  }

  //-----Delete-----//
  onDelete = () => {
    const confirmPrompt = window.confirm('Are you sure you want to delete this note?')

    if (confirmPrompt === true) {
      fileDelete(this.state.link)
    }
    this.setState({
      view: false
    })
    NotificationManager.info('Note Deleted')
  }


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

      settingsScreen = () => {
        this.setState({settingsView: !this.state.settingsView, view: false})
      }

  render() {
    if (this.state.settingsView){this.DownloadDisplay = <Settings settingsScreen={this.settingsScreen}/>}
    else if(this.state.view === false){
      this.DownloadDisplay = 
        <WelcomePage  
          docList = {this.state.recentDocuments}
          getDoc={this.getDocument}
          sendLink = {this.getLink}
          newNote = {this.newNote}
          settingsScreen = {this.settingsScreen}/>}
    else if (this.state.view === true){
      this.DownloadDisplay = 
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
          savedNote = {this.onSave}
          onDelete = {this.onDelete}
          document={this.state.document}/>
    }
    return (
      <>
      <CssBaseline >
        <TitleBar className="title-bar" />
        <div className="App">
          <div id="content-container">
            <NotificationContainer />
            <SplitPane
              minSize={225}
              ref={this.paneWidth}
              id='main-split-pane' 
              split="vertical" 
              size={this.state.navExpanded ? 300 : 50}
              defaultSize={740}
              position='static' 
              allowResize={this.state.navExpanded ? true : false}>
                <div id="nav-col">
                  <Explorer 
                    getExpansion={this.getExpansion}
                    getDocument = {this.getDocument}
                  />
                </div>
                <div id="note-col">
                  {this.DownloadDisplay}
                </div>
            </SplitPane>
          </div>
            <Tooltip title="Settings" aria-label="settings">
                  <SettingsIcon size='24' className='settings-button' onClick={this.settingsScreen} />
            </Tooltip>
        </div>
          <BottomBar view={this.state.view} layoutChange = {this.layoutChange} onExit={this.onExit} />
        </CssBaseline>
      </>
    );
  }
>>>>>>> 815dd7e... Massive Revision for the project
}

 export default App
>>>>>>> c1923cc73491294e0ad84a68eba40b0fe37a0097
