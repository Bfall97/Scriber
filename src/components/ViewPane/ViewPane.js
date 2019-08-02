import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import '../ViewPane/ViewPane.scss'
const showdown = require('showdown')
const showdownHighlight = require('showdown-highlight')
const showdowntoc = require('../../showdownExt/showdown-toc.js')

// !Saving new note does not work. Title is also bugging out.
export default function ViewPane (props) {
  let title = ''

  function convertMD () {
    const converter = new showdown.Converter({
      extensions: [showdownHighlight, showdowntoc]
    })
    converter.setFlavor('github')
    const display = (converter.makeHtml(props.content))
    const htmlDisplay = ReactHtmlParser(display)
    if (props.link === '' && props.toBeSaved === false) {
      htmlDisplay.forEach(element => {
        if (element.type === 'h1') {
          title = element.props.children[0]
        }
        if (props.link === '' && props.title === '') { props.getTitle(title) }
      }
      )
    }
    return htmlDisplay
  }

  return (
    <div className="view-pane" id='vp'>
      {convertMD()}
    </div>

  )
}
