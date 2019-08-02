import React, { Component } from 'react'
import styled from 'styled-components'
import Moment from 'react-moment'
import Input from '@material-ui/core/Input'

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
      filter: ''
    })
  }

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
    const data = this.props.data

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

          return <ListItem onClick={this.handleCheck} data-file={entry} data-path={entry.path_lower} key={entry.path_lower}>{titleFormat} <Date><Moment>{dateToFormat}</Moment></Date></ListItem>
        })}
      </div>
    )
  }
}

export default NoteList
