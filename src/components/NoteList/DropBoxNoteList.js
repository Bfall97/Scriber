import React, { Component } from 'react'
import styled from 'styled-components'
import Moment from 'react-moment'
import Input from '@material-ui/core/Input'
import TreeView from '../../../node_modules/react-treeview';

const Dropbox = require('dropbox').Dropbox
const ListItem = styled.li`
text-align: left;
line-height: 0.9em;
border-radius: 18px;
padding: 4px;
padding-left: 1;
margin-left: 0;
font-size: 13px;
width: 100%;
:hover{
  color: black;
  font-weight: 500;
  cursor: pointer;
  background-color:#bfb7b7
  transition: background .2s;
  
}
`

const Date = styled.p`
text-align: right;
line-height: 0.4em;
font-size: 10px;
color:#36373a 
opacity: 0.8;
font-style: italic;
`

class NoteList extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      link: '',
      filter: '',
      data: [],
    })
  }


  componentDidMount(){
    this.DownloadFiles()
  }
  // DropBox API
  
  // TODO: User input of accessToken when Login/Sign up is done
  DownloadFiles = () => {
    var dbx = new Dropbox({
      fetch,
      accessToken:
          'HqkVb2MBXGAAAAAAAAAAV0Lj4ZNMkt8jY9WnDMHbCOZjvzgpAG12Xy1WVzcWPHIK'
    })
    dbx
      .filesListFolder({
        path: '',
        recursive: true,

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




  handleCheck = (e) => {
    this.setState({
      link: e.currentTarget.dataset.path
    })

    this.props.sendLink(e.currentTarget.dataset.path) // Passes back to Navigator Component
  };

  handleSearchChange=event => {
    this.setState({ filter: event.target.value })
  }

  render () {
    const data = this.state.data

    // Sort by last modified
    if (this.state.filter === '') {
      data.sort(function (a, b) {
        if (a.client_modified > b.client_modified) {
          return -1
        }
        if (a.client_modified < b.client_modified) {
          return 1
        // a must be equal to b
        }
        return 0
      })
    }

    //   const lowercasedFilter = this.state.filter.toLowerCase();
    //   data.filter(item =>{

    //     item.low
    //     // return Object.keys(item).some(key=>
    //       // item.path_lower.includes(lowercasedFilter));
    //   })
    // }

    return (
      <div>
        <Input
          id = "outlined-name"
          label='Search'
          placeholder = 'Search...'
          onChange={this.handleSearchChange}
        />
        {data.slice(this.props.startNum, this.props.subsetNum).map((entry, index) => {
          // format last modify date.
          const dateToFormat = entry.client_modified
          let titleFormat
          // Format file names
          if (entry['.tag'] === 'file') { // only for file types
            titleFormat = entry.name
            titleFormat = titleFormat.charAt(0).toUpperCase() + titleFormat.slice(1) // capitalize first letter
            titleFormat = titleFormat.slice(0, -3) // take out '.md' at end of file
          } else {
            titleFormat = entry.name
          }

          return <TreeView>
                  <ListItem onClick={this.handleCheck} data-file={entry} data-path={entry.path_lower} key={entry.path_lower}><div>{titleFormat} <Date><Moment>{dateToFormat}</Moment></Date></div></ListItem>
                </TreeView>
        })}
      </div>
    )
  }
}

export default NoteList
