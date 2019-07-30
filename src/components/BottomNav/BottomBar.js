import '../BottomNav/BottomBar.css'
import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { CloseO } from 'styled-icons/evil/CloseO'
import { Edit } from 'styled-icons/boxicons-solid/Edit'
import { Pre } from 'styled-icons/crypto/Pre'
import { BookContent } from 'styled-icons/boxicons-solid/BookContent'

export default class BottomBar extends Component {
  render () {
    let LayoutButtons = 
    <div className="note-buttons">
      <CloseO size="23" className="close-o" onClick={this.props.onExit} />
      <Tooltip title="Focused Edit Mode" aria-label="edit">
        <Edit
          size="20"
          className="edit"
          onClick={() => this.props.layoutChange('edit')}
        />
      </Tooltip>
      <Tooltip title="Preview Mode">
        <Pre
          size="20"
          className="pre"
          onClick={() => this.props.layoutChange('preview')}
        />
      </Tooltip>
      <Tooltip title="Split View Mode">
        <BookContent
          size="20"
          className="book-content"
          onClick={() => this.props.layoutChange('split')}
        />
      </Tooltip>
    </div>
  
    return (
      <div className='bottom-bar'>
        {this.props.view ? LayoutButtons : null}
      </div>
    )
  }
}
