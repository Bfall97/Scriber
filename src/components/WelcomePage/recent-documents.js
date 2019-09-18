import React, { Component } from 'react'
import Moment from 'react-moment'
import Notes from '@material-ui/icons/Notes'
import styled from 'styled-components'
import './recent-docs.scss'



export const StyledText = styled(Notes)`
  color: #363434;
  opacity: 0.8;
  width: 100% !important;
  height: 0.7em !important;
  margin: 0px;
  font-size: 90px !important;

  
`
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
                    
                    <StyledText 
                        fontSize='large' 
                        viewBox= '5 3 22 22' 
                    />
                    
                 <h6><em><Moment>{this.props.documentDate}</Moment></em></h6>
            </div>
            :
            <div id='recent-doc' className='empty'></div>
        )
    }
}

