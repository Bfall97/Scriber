import React, { Component } from 'react'
import PureComponent from 'react-pure-render/component'
import { Markdown } from 'react-showdown';
import '../ViewPane/ViewPane.scss'
//TODO: Check this --> !Saving new note does not work. Title is also bugging out.

// export default function ViewPane (props) {
  export default class ViewPane extends PureComponent{
    constructor (props) {
      super(props)
      let title = ''
    }

  render(){ 
    return(
      <div className="view-pane" id='vp'>
        <Markdown markup={ this.props.content } smoothLivePreview={true} />
      </div>
    )
  }
}

