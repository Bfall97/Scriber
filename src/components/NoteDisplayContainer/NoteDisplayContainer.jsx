import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { Save } from 'styled-icons/boxicons-regular/Save'
import { Trash } from 'styled-icons/boxicons-regular/Trash'
import { Checkmark } from 'styled-icons/icomoon/Checkmark'
<<<<<<< HEAD
import { SpinLoader } from 'react-css-loaders'
=======
import { SpinLoader } from 'react-css-loaders2'
>>>>>>> 815dd7e... Massive Revision for the project
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

<<<<<<< HEAD
=======
  //  Set the content of given file to state
  viewFile = () =>{
      if(this.props.document.local_path){ // A local note
        this.setState({isLoading: true, content: openFile(this.props.document.local_path)})
        this.setState({isLoading: false})
      }
    }

>>>>>>> 815dd7e... Massive Revision for the project
  // Update Function for Editor and ViewPane
        onMarkdownChange =(md) => {
          this.setState({
            content: md,
            toBeSaved: true
          })
          this.props.getContent(this.state.content) // Passes content back to App.js
        }

        // -------Download again when new link is clicked-------//
<<<<<<< HEAD
        componentDidUpdate (propsLink, newPropLayout) {
          if (propsLink.link !== this.props.link) {
            this.handleDownload()
=======
        componentDidUpdate (propsLink) {
          if (propsLink.link !== this.props.link) {
            this.viewFile()
>>>>>>> 815dd7e... Massive Revision for the project
          } else {
            return false
          }
        }

<<<<<<< HEAD
        /// ---- Trigger download function on Display-------////
=======
        /// ---- Trigger View function on Display-------////
>>>>>>> 815dd7e... Massive Revision for the project
        componentDidMount () {
          if (this.props.link === '') {
            console.log('new note detected')
            this.setState({
              isLoading: false, // prevents infinite loading on new note.
              content: '' // reset content state, prevents old data from showing.
            })
          }
<<<<<<< HEAD
          this.handleDownload()
        }

      // --------Download File Content------//
      handleDownload = () => {
        // Handle different sourced data
        if (this.props.document.source === 'local') {
          this.setState({
            isLoading: false
          })
          const fileContent = openFile(this.props.document.path)
          this.setState({
            content: fileContent,
            isLoading: false
          })
        } else if (this.props.document.source === 'dropbox') {
          var dbx = new Dropbox({ fetch: fetch, accessToken: 'HqkVb2MBXGAAAAAAAAAAV0Lj4ZNMkt8jY9WnDMHbCOZjvzgpAG12Xy1WVzcWPHIK' })
          dbx.filesDownload({ path: this.props.link })
            .then((response) => {
              const blob = response.fileBlob
              this.handleRead(blob)
            })
            .catch((error) => {
              console.log(error)
            })
          return false
        }
      }

=======
          // If not new file, view it.
          this.viewFile()
        }

>>>>>>> 815dd7e... Massive Revision for the project
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

<<<<<<< HEAD
      // TODO: Handle exit with unsaved changes here done? BUG HERE
=======
      //BUG HERE
>>>>>>> 815dd7e... Massive Revision for the project
      componentWillUnmount () {
        if (this.state.toBeSaved) {
          const savePrompt = window.confirm('You have unsaved changes. Would you like to save now?')
          if (savePrompt) {
            this.onSave()
          }
        }
      }

<<<<<<< HEAD
      // TODO: Update List to show changes
      // TODO: Ideally I would want the savedNote function only on success. (.then) and fail in .catch
      // --Handle Create and Update of CRUD---- //
      onSave = () => {
        let link

        var dbx = new Dropbox({ fetch, accessToken: 'HqkVb2MBXGAAAAAAAAAAV0Lj4ZNMkt8jY9WnDMHbCOZjvzgpAG12Xy1WVzcWPHIK' })

        if (this.props.link === '') {
          // getTitle=(title)=>{
          //   if(this.state.toBeSaved === true){
          this.setState({
            title: ''
          })
          // }
          // }
          //  link =  prompt("Please enter note title"); TODO: Prompt not supported in Electron, NPM package to replace
          link = this.state.title
          dbx.filesUpload({ path: '/' + link + '.md', contents: this.state.content, mode: 'add' })
            .then(function (response) {
            })
            .catch(function (error) {
              console.error(error)
            })
        } else {
          link = this.props.link
          dbx.filesUpload({ path: link, contents: this.state.content, mode: 'overwrite' })
            .then(function (response) {
              // success = true;
              console.log('saved')
            })
            .catch(function (error) {
              console.error(error)
            })
        }

        // Detect if content has changed
        if (this.state.toBeSaved) this.props.savedNote(true)
=======
      // --Handle Create and Update of CRUD---- //
      onSave = () => {
        // Detect if content has changed
        if (this.state.toBeSaved) this.props.savedNote()
>>>>>>> 815dd7e... Massive Revision for the project
        this.setState({
          toBeSaved: false
        })
      }
<<<<<<< HEAD

      // TODO: Update list to handle changes
      // --Handle Delete of CRUD-- //
      onDelete = () => {
        const confirmPrompt = window.confirm('Are you sure you want to delete this note?')

        if (confirmPrompt === true) {
          var dbx = new Dropbox({ fetch, accessToken: 'HqkVb2MBXGAAAAAAAAAAV0Lj4ZNMkt8jY9WnDMHbCOZjvzgpAG12Xy1WVzcWPHIK' })
          dbx.filesDelete({ path: this.props.link })
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.error(error)
            })
          this.props.deletedNote(false)
        }
=======
      // --Handle Delete of CRUD-- //
      onDelete = () => {
          this.props.onDelete()
>>>>>>> 815dd7e... Massive Revision for the project
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
<<<<<<< HEAD
          : <div className='split-pane-container'>
=======
          : 
          <div className='split-pane-container'>
>>>>>>> 815dd7e... Massive Revision for the project
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
