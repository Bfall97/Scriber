import React, { useState, useEffect }  from 'react'
import Button from '@material-ui/core/Button';
import RecentDoc from './recent-documents.js'
import './welcome-page.scss'

// NOTE - this is more of a draft, as a proof of concept
//      I dont really care about content or styles right now.

//TODO Implement theme color for buttons
//TODO Once File system is implemented, pass the corresponding functions as props to these buttons.

const welcomePage = (props) => {
  
    return (
        <div className='welcomepage-container'>
            <h1>Welcome.</h1>
            
            {/* Recent documents component here? */}
            {/* could 3 most recent document --> turn them into previews -> scale them way down 
                    Might degrade performance, is it possible to get a snapshot of the document?*/}
                {/* using map, iterate through last 3 documents and print them? */}
            <div className='recent-doc-container'>
                <h4>Recent Documents</h4>
                {
                    props.docList.slice(0, 3).map((item) => {
                    console.log(item)
                        return <RecentDoc 
                        key={item.id} 
                        documentTitle={ item.name.substring(0, item.name.length - 3) }
                        documentDate= {item.client_modified}
                    />
                    })
                }
            </div>

            <Button className='btn' variant="contained">New Document</Button>
            <Button className='btn' variant="contained" >Load Document</Button>
            <Button className='btn' variant="contained" >Settings</Button>
            <div welcome-links>
                <Button className='btn-link' >Keyboard Shortcuts</Button>
                <Button className='btn-link' >Github</Button>
            </div>
            
        </div>
    );
}

export default welcomePage

