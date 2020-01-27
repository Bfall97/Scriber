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

  componentDidMount=()=>{
    if (setting.get('recentDocs.recentDocs') && setting.get('recentDocs.recentDocs').length) {
      let docs = setting.get('recentDocs.recentDocs')
      this.setState({recentDocuments:docs})
    } // Load Recent Docs if available
  }

  // Toggle Theme Change
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
