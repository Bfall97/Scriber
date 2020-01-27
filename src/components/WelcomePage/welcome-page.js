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
<<<<<<< HEAD
=======
=======
>>>>>>> 72b801b768fc8c43b00521d7103a0d253d50f15b
            
            {/* Recent documents component here? */}
            {/* could 3 most recent document --> turn them into previews -> scale them way down 
                    Might degrade performance, is it possible to get a snapshot of the document?*/}
                {/* using map, iterate through last 3 documents and print them? */}
<<<<<<< HEAD
=======
>>>>>>> 815dd7e... Massive Revision for the project
=======
>>>>>>> c1923cc73491294e0ad84a68eba40b0fe37a0097
>>>>>>> 72b801b768fc8c43b00521d7103a0d253d50f15b
            <div className='recent-doc-container'>
                
                <h4>Recent Documents</h4>
                {
                 
                 sortedDocList.slice(0, 3).map((item) => {
                        return <RecentDoc 
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> 72b801b768fc8c43b00521d7103a0d253d50f15b
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
<<<<<<< HEAD
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
>>>>>>> 815dd7e... Massive Revision for the project
=======
>>>>>>> c1923cc73491294e0ad84a68eba40b0fe37a0097
>>>>>>> 72b801b768fc8c43b00521d7103a0d253d50f15b
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

