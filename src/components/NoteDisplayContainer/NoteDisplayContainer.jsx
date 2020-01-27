import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { Save } from 'styled-icons/boxicons-regular/Save'
import { Trash } from 'styled-icons/boxicons-regular/Trash'
import { Checkmark } from 'styled-icons/icomoon/Checkmark'
import { SpinLoader } from 'react-css-loaders2'
import SplitPaneContainer from '../../components/SplitPlaneContainer/SplitPaneContainer'
import { openFile } from '../../LocalFileSystem.js'
// import { handleDownloadRead, handleRead, downloadFileList } from './Dropbox.js'

import '../NoteDisplayContainer/NoteDisplayContainer.css'
import '../SplitPlaneContainer/split-pane.css'
import '../../vendor/Styles.css'

const Dropbox = require('dropbox').Dropbox

// TODO: Handle other file types, here and in NoteList

export default class NoteDisplayContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      content: '',
      contentDisplay: '',
      isLoading: true,
      toBeSaved: false,
      latestResponse: '',
      title: ''
    }
  }

  //  Set the content of given file to state
  viewFile = () =>{
      if(this.props.document.local_path){ // A local note
        this.setState({isLoading: true, content: openFile(this.props.document.local_path)})
        this.setState({isLoading: false})
      }
    }

  // Update Function for Editor and ViewPane
        onMarkdownChange =(md) => {
          this.setState({
            content: md,
            toBeSaved: true
          })
          this.props.getContent(this.state.content) // Passes content back to App.js
        }

        // -------Download again when new link is clicked-------//
        componentDidUpdate (propsLink) {
          if (propsLink.link !== this.props.link) {
            this.viewFile()
          } else {
            return false
          }
        }

        /// ---- Trigger View function on Display-------////
        componentDidMount () {
          if (this.props.link === '') {
            console.log('new note detected')
            this.setState({
              isLoading: false, // prevents infinite loading on new note.
              content: '' // reset content state, prevents old data from showing.
            })
          }
          // If not new file, view it.
          this.viewFile()
        }

      /// ------ Start file read for Markdown Parsing------//
      handleRead = (blob) => {
        var reader = new FileReader()
        reader.onloadend = function () {
          const dataContent = reader.result
          this.setState({
            content: dataContent,
            isLoading: false
          })
        }.bind(this)

        reader.readAsText(blob)
      }

      //BUG HERE
      componentWillUnmount () {
        if (this.state.toBeSaved) {
          const savePrompt = window.confirm('You have unsaved changes. Would you like to save now?')
          if (savePrompt) {
            this.onSave()
          }
        }
      }

      // --Handle Create and Update of CRUD---- //
      onSave = () => {
        // Detect if content has changed
        if (this.state.toBeSaved) this.props.savedNote()
        this.setState({
          toBeSaved: false
        })
      }
      // --Handle Delete of CRUD-- //
      onDelete = () => {
          this.props.onDelete()
      }

    getTitle=(newTitle) => {
      this.setState({
        title: newTitle
      })
    }

    render () {
      // Grab theme colours for loader colours
      const primaryAccent = getComputedStyle(document.documentElement)
        .getPropertyValue('--primaryAccent')

      const primaryBack = getComputedStyle(document.documentElement)
        .getPropertyValue('--primaryBackground')

      return (
      // Loader
        this.state.isLoading ? <SpinLoader color={primaryAccent} background={primaryBack} size={7} /> // Loader goes here
          : 
          <div className='split-pane-container'>
            <SplitPaneContainer
              getTitle={this.getTitle}
              onSave={() => this.onSave()}
              viewHeight={this.props.viewHeight}
              link={this.props.link}
              content={this.state.content}
              onMarkdownChange ={this.onMarkdownChange}
              layout={this.props.layout}
              toBeSaved={this.state.toBeSaved}
              title={this.state.title}
            />
            <div className='crud-buttons'>
              {/* Crud Buttons */}
              <Tooltip title='Save File' aria-label="save" >
                { this.state.toBeSaved ? <Save size='20' className='save' onClick={this.onSave} /> : <Checkmark size='20' className='check' /> }
              </Tooltip>

              <Tooltip title='Delete File' aria-label="delete" onClick={this.onDelete}>
                <Trash size='20' className='delete'/>
              </Tooltip>
            </div>

          </div>
      )
    }
}
