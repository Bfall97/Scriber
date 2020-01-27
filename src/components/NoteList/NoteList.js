import React, { Component } from 'react'
import styled from 'styled-components'
import Moment from 'react-moment'
import Input from '@material-ui/core/Input'
import NoteListSearch from '../NoteListSearch/NotelistSearch'
import { SpinLoader } from 'react-css-loaders'

// Can lazy load the notelist with infinite Scrolling from Grommet

// const ListItem = styled.li`
// text-align: left;
// line-height: 0.9em;
// border-radius: 18px;
// padding: 4px;
// padding-left: 1;
// margin-left: 0;
// font-size: 13px;
// width: 100%;
// }
// `

// const Date = styled.p`
// text-align: right;
// line-height: 0.4em;
// font-size: 10px;
// color:#36373a
// opacity: 0.8;
// font-style: italic;
// `

class NoteList extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      link: '',
      filter: ''
    })
  }

  handleCheck = (e) => {
    this.setState({
      link: e.currentTarget.dataset.path
    })

    this.props.sendLink(JSON.parse(e.currentTarget.dataset.file)) // Passes back to App Component
  };

  handleSearchChange=event => {
    this.setState({ filter: event.target.value })
  }

  render () {
    const formattedData = []
    let data = this.props.data
    //Giving the data a common format no matter where it came from
    if (data) {
      data.map((item)=>{
        var nm = item.name.slice(0, -3)
        nm.charAt(0).toUpperCase() + item.name.slice(1) // capitalize first letter and trim extension
        if( item['.tag']){
        const dbFile = Object.create({})
        dbFile.fileType = item['.tag']        
        dbFile.name = nm
        dbFile.path = item.path_lower
        dbFile.lastModified = item.client_modified
        dbFile.source = 'dropbox'

        formattedData.push(dbFile)
      }else{
        const lcFile = Object.create({})
        lcFile.fileType = 'file'
        lcFile.name = item.name
        lcFile.path = item.filepath
        lcFile.lastModified = item.stat.mtime
        lcFile.source = 'local'
        
        formattedData.push(lcFile)
      } 
        
      })
      data = formattedData
    }

    
    // Sort by last modified
    if (this.props.data !== null && this.state.filter === '') {
      data.sort(function (a, b) {
        if (a.lastModified > b.lastModified) {
          return -1
        }
        if (a.lastModified < b.lastModifiedodified) {
          return 1
        // a must be equal to b
        }
        return 0
      })
    }

    return (
      this.props.data !== null
      ? 
    this.props.isLoading ? <SpinLoader color={getComputedStyle(document.documentElement).getPropertyValue('--primaryAccent')} background={ getComputedStyle(document.documentElement).getPropertyValue('--primaryBackground')} size={5} />
      :
      <div className='content-menu'>


          <h3>{this.props.title}</h3>
         {/* <Input */}
        {/* //   id = "outlined-name"
        //   label='Search'
        //   placeholder = 'Search...'
        //   onChange={this.handleSearchChange}
        // /> */} 
           {/* NOTE: Maybe this would work with a filter on the list? */}
          {data.slice(this.props.startNum, this.props.subsetNum).map((entry, index) => {
            //{/* <NoteListSearch data={this.props.data}/> */}
          
          // format last modify date.
            const dateToFormat = entry.lastModified

            return <li onClick={this.handleCheck} data-file={JSON.stringify(entry)} key={entry.path}>{entry.name} <p><Moment format="LLL">{dateToFormat}</Moment></p></li>
          })}
      
        </div>
      
      :            <div className='content-menu'>
          <h3>{this.props.title}</h3>
          {this.props.connectorComponent}
        </div>
    )
  }
}

export default NoteList
