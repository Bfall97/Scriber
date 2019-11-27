import React, { Component } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import '../Editor/EditorSass.scss'
require('codemirror/lib/codemirror.css')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/python/python')
require('codemirror/mode/xml/xml')
require('codemirror/mode/markdown/markdown')
require('codemirror/theme/base16-light.css')
require('../../components/Editor/custom-editor.css')
require('codemirror/keymap/sublime.js')

var autoRefresh = require('codemirror/addon/display/autorefresh')
//TODO lots of bugs here
//TODO Addons?
export default class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value
    }
    this.updateCode = this.updateCode.bind(this)
  }

  componentWillReceiveProps(propVal){
    this.props.value !== propVal.value ? this.setState({value:propVal.value}) : false
  }

  updateCode (e) {
    this.props.onChange(e)
  }

  // Make sure value is set before render
  componentWillMount () {
    if (this.state.value !== this.props.value) {
      this.setState({
        value: this.props.value
      })
    }
  }

  render () {
    // Default Keymaps
    var keyMaps = { 'Shift-Tab': 'indentLess',
      'Shift-Ctrl-K': 'deleteLine',
      'Alt-Q': 'wrapLines',
      'Ctrl-T': 'transposeChars',
      'Alt-Left': 'goSubwordLeft',
      'Alt-Right': 'goSubwordRight',
      'Ctrl-Up': 'scrollLineUp',
      'Ctrl-Down': 'scrollLineDown',
      'Ctrl-L': 'selectLine',
      'Shift-Ctrl-L': 'splitSelectionByLine',
      Esc: 'singleSelectionTop',
      'Ctrl-Enter': 'insertLineAfter',
      'Shift-Ctrl-Enter': 'insertLineBefore',
      'Ctrl-D': 'selectNextOccurrence',
      'Shift-Ctrl-Space': 'selectScope',
      'Shift-Ctrl-M': 'selectBetweenBrackets',
      'Ctrl-M': 'goToBracket',
      'Shift-Ctrl-Up': 'swapLineUp',
      'Shift-Ctrl-Down': 'swapLineDown',
      'Ctrl-/': 'toggleCommentIndented',
      'Ctrl-J': 'joinLines',
      'Shift-Ctrl-D': 'duplicateLine',
      F9: 'sortLines',
      'Ctrl-F9': 'sortLinesInsensitive',
      F2: 'nextBookmark',
      'Shift-F2': 'prevBookmark',
      'Ctrl-F2': 'toggleBookmark',
      'Shift-Ctrl-F2': 'clearBookmarks',
      'Alt-F2': 'selectBookmarks',
      Backspace: 'smartBackspace',
      'Ctrl-K Ctrl-K': 'delLineRight',
      'Ctrl-K Ctrl-U': 'upcaseAtCursor',
      'Ctrl-K Ctrl-L': 'downcaseAtCursor',
      'Ctrl-K Ctrl-Space': 'setSublimeMark',
      'Ctrl-K Ctrl-A': 'selectToSublimeMark',
      'Ctrl-K Ctrl-W': 'deleteToSublimeMark',
      'Ctrl-K Ctrl-X': 'swapWithSublimeMark',
      'Ctrl-K Ctrl-Y': 'sublimeYank',
      'Ctrl-K Ctrl-C': 'showInCenter',
      'Ctrl-K Ctrl-G': 'clearBookmarks',
      'Ctrl-K Ctrl-Backspace': 'delLineLeft',
      'Ctrl-K Ctrl-0': 'unfoldAll',
      'Ctrl-K Ctrl-J': 'unfoldAll',
      'Ctrl-Alt-Up': 'addCursorToPrevLine',
      'Ctrl-Alt-Down': 'addCursorToNextLine',
      'Ctrl-F3': 'findUnder',
      'Shift-Ctrl-F3': 'findUnderPrevious',
      'Shift-Ctrl-[': 'fold',
      'Shift-Ctrl-]': 'unfold',
      'Ctrl-H': 'replace'
    }

    // CodeMirror Options
    var options = { mode: 'markdown',
      theme: 'base16-light',
      lineWrapping: 'true',
      lineNumbers: 'true',
      viewportMargin: 10,
      crudeMeasuringFrom: 5000,
      maxHighlightLength: 5000,
      extraKeys: keyMaps,
      spellcheck: true,
      cursorScrollMargin: 5,
      autoRefresh
    }

    // Reference editor instance
    const cm = require('codemirror')
    return (
      <CodeMirror
        value={this.state.value}

        onClick={
          (editor) => {
            editor.instance.refresh()
          }
        }

        // onViewportChange={(editor) => {editor.instance.refresh()}}

        options={options}

        onBeforeChange={(editor, data, value) => { this.setState({ value }) }}

        onChange={(editor, data, value) => { this.updateCode(value) }}

        editorDidMount={
          (editor) => {
            cm.commands.save = () => this.props.onSave()
            this.instance = editor
            this.instance.refresh()
          }
        }
      />
    )
  }
}
