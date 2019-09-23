import '../BottomNav/BottomBar.css'
import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { CloseO } from 'styled-icons/evil/CloseO'
import { Edit } from 'styled-icons/boxicons-solid/Edit'
import { BookContent } from 'styled-icons/boxicons-solid/BookContent'
import { DocumentText } from 'styled-icons/typicons/DocumentText'

// REVIEW - it may be better to replace these with Material UI FABs (floating action buttons)

export default class BottomBar extends Component {
  render () {
    const LayoutButtons =
    <div className="note-buttons">
      <CloseO size="30" className="close-o" onClick={this.props.onExit} />
      <Tooltip title="Focused Edit Mode" aria-label="edit">
        <Edit
          size="28"
          className="edit"
          onClick={() => this.props.layoutChange('edit')}
        />
      </Tooltip>
      <Tooltip title="Preview Mode">
        <DocumentText
          size="28"
          className="pre"
          onClick={() => this.props.layoutChange('preview')}
        />
      </Tooltip>
      <Tooltip title="Split View Mode">
        <BookContent
          size="28"
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
