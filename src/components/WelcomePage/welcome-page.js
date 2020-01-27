import React, { useState, useEffect }  from 'react'
import Button from '@material-ui/core/Button';
import RecentDoc from './recent-documents.js'
import { fileWrite, fileRead, defaultFolderRead, readFilesSync } from '../../LocalFileSystem.js'
import './welcome-page.scss'

const welcomePage = (props) => {
    const sortedDocList = props.docList.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)

    return (
        <div className='welcomepage-container'>
            <h2>Welcome.</h2>
<<<<<<< HEAD
            
            {/* Recent documents component here? */}
            {/* could 3 most recent document --> turn them into previews -> scale them way down 
                    Might degrade performance, is it possible to get a snapshot of the document?*/}
                {/* using map, iterate through last 3 documents and print them? */}
=======
>>>>>>> parent of 72b801b... Merge branch 'master' of https://github.com/Bfall97/Noted2
            <div className='recent-doc-container'>
                
                <h4>Recent Documents</h4>
                {
                 
                 sortedDocList.slice(0, 3).map((item) => {
                        return <RecentDoc 
<<<<<<< HEAD
                        key={item.path} 
                        documentTitle={item.name}
                        documentDate= {item.lastModified}
                        path={item.path}
                        doc={item}
                        sendLink={props.sendLink}
                    />
                    })
                }
            </div>

            <Button onClick={props.newNote} size={"small"} className='btn' variant="contained">New Document</Button>
            <Button onClick={fileRead} size={'small'} className='btn' variant="contained" >Load Document</Button>
=======
                            key={item.id}
                            documentTitle={item.name}
                            documentDate= {item.stats.mtime}
                            path={item.local_path}
                            doc={item}
                            sendLink={props.sendLink}
                            getDoc={props.getDoc}
                          />
                    })
                }
            </div>
                {/* Move fileRead to function in app.js */}
            <Button onClick={props.newNote} size={"small"} className='btn' variant="contained">New Document</Button>
            <Button onClick={fileRead} size={'small'} className='btn' variant="contained" >Load Document</Button>   
>>>>>>> parent of 72b801b... Merge branch 'master' of https://github.com/Bfall97/Noted2
            <Button onClick={props.settingsScreen} size={'small'} className='btn' variant="contained" >Settings</Button>
            <div welcome-links>
                {/* //TODO Still need to apply functions to these buttons (keyboard shortcuts, github link) */}
                <Button className='btn-link' >Keyboard Shortcuts</Button>
                <Button className='btn-link' >Github</Button>
            </div>
            
        </div>
    );
}

export default welcomePage

