import React, { Component } from 'react'
import PureComponent from 'react-pure-render/component'
import { Markdown } from 'react-showdown';
<<<<<<< HEAD
import marked from 'marked';

=======
>>>>>>> c1923cc73491294e0ad84a68eba40b0fe37a0097
import '../ViewPane/ViewPane.scss'
//TODO: Check this --> !Saving new note does not work. Title is also bugging out.

// export default function ViewPane (props) {
  export default class ViewPane extends PureComponent{
    constructor (props) {
      super(props)
      let title = ''
    }

<<<<<<< HEAD
    getMarkdownText() {
      var rawMarkup = marked(this.props.content, {sanitize: true});
      return { __html: rawMarkup };
    }

    //  apparently Marked is the fastes parser. maybe try that?
    // https://stackoverflow.com/questions/34686523/using-marked-in-react/34688574
  render(){
    return(
      <div className="view-pane" id='vp'  dangerouslySetInnerHTML={this.getMarkdownText()} >
        {/* <Markdown markup={ this.props.content } smoothLivePreview={true} /> */}
=======
  render(){ 
    return(
      <div className="view-pane" id='vp'>
        <Markdown markup={ this.props.content } smoothLivePreview={true} />
>>>>>>> c1923cc73491294e0ad84a68eba40b0fe37a0097
      </div>
    )
  }
}

