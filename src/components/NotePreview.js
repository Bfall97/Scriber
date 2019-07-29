import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import Editor from './Editor.js'
import SplitPane from 'react-split-pane'
import PureComponent from 'react-pure-render/component'
import 'highlight.js/styles/rainbow.css'
// import 'jquery-lazy/jquery.lazy';
const showdown = require('showdown')
const showdownHighlight = require('showdown-highlight')
const showdowntoc = require('../showdownExt/showdown-toc.js')

// TODO: Either merge this logic with the Editor-containers or find out where to put this.

let title = ''

export default class NotePreview extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      link: '',
      toBeSaved: false,
      isLoading: true

    }
  }

  convertMD () {
    const converter = new showdown.Converter({
      extensions: [showdownHighlight, showdowntoc]
    })
    converter.setFlavor('github')
    const display = (converter.makeHtml(this.props.content))
    const htmlDisplay = ReactHtmlParser(display)
    htmlDisplay.forEach(element => {
      if (element.type === 'h1') {
        title = element.props.children[0]
      }
    })
    return htmlDisplay
  }

  // limits rendering to when user stops typing.
  /// NOTE: I may want to change this to a Throttle function instead
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
    if (this.props.link === '') {
      this.props.getTitle(title)
    }

    return (
      <SplitPane split="vertical" minSize={50} defaultSize= {this.props.layout} size={this.props.layout} >

        <div className="editor-Pane">
          <Editor className='editor' onSave={() => this.props.onSave()} value={this.props.content}
            onChange={this.props.content.length > 25000 ? this.debounced(100, this.props.onMarkdownChange) : this.props.onMarkdownChange}/>
          {/* ^^^ Sets a debounce function if the document is larger than 25000 characters. Helps with Editor Performance */}
        </div>
        <div className="view-pane" id='vp'>
          {/* taking out lazy load for now, its only causing problems */}
          {/* <Infinite className= 'pre' containerHeight={this.props.viewHeight} elementHeight={20} isInfiniteLoading={true} infiniteLoadBeginEdgeOffset={100}>  */}
          {this.convertMD()}
          {/* </Infinite>            */}

        </div>
      </SplitPane>
    )
  }
}
