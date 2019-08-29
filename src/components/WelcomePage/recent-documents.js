import React, { Component } from 'react'
import Moment from 'react-moment'
import './recent-docs.scss'

// NOTE Keeping this simple for now, just displaying their titles.
export default class recentdocuments extends Component {
constructor(props) {
    super(props);
}

handleClick = (link) => {
    // 1. Find out where the link is from (i.e. local, Dropbox, Google, etc.) How?
    //2. Proceed to download from source
    //3. Trigger display, getting rid of welcome page
}

render(){
    //On click get targets link and download and display the file
        // Find a way to distinguish between a dropbox file and a local file.
    return (
      this.props.documentTitle ? 
             <div id='recent-doc' className='document' onClick={this.handleClick}>
                 <h5>{this.props.documentTitle}</h5>
                 <h6><em><Moment>{this.props.documentDate}</Moment></em></h6>
            </div>
            :
            <div id='recent-doc' className='empty'></div>
        )
    }
}

