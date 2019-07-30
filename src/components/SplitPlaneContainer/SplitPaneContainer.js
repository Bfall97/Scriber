import React from 'react'
// import ReactHtmlParser from 'react-html-parser'
import Editor from '../Editor/Editor.js'
import SplitPane from 'react-split-pane'
import PureComponent from 'react-pure-render/component'
import ViewPane from '../../components/ViewPane/ViewPane.js'
import 'highlight.js/styles/rainbow.css'

// TODO: Either merge this logic with the Editor-containers or find out where to put this.

export default class SplitPaneContainer extends PureComponent {
  // limits rendering to when user stops typing.
  // !NOTE: I may want to change this to a Throttle function instead
  debounced (delay, fn) {
    let timerId
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId)
      }
      timerId = setTimeout(() => {
        fn(...args)
        timerId = null
      }, delay)
    }
  }

  render () {
    return (
      <SplitPane split="vertical" minSize={50} defaultSize= {this.props.layout} size={this.props.layout} >
        <div className="editor-Pane">
          <Editor 
            className='editor'
            onSave={() => this.props.onSave()} 
            value={this.props.content}
            onChange={this.props.content.length > 25000 ? this.debounced(100, this.props.onMarkdownChange) : this.props.onMarkdownChange}
          />
          {/* ^^^ Sets a debounce function if the document is larger than 25000 characters. Helps with Editor Performance */}
        </div>
        <ViewPane 
          toBeSaved={this.props.toBeSaved}
          link={this.props.link}
          getTitle = {this.props.getTitle} 
          content={this.props.content}
          title={this.props.title}
        />
      </SplitPane>
    )
   }
}
