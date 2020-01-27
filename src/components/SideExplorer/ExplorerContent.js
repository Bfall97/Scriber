import React from "react";
import { AccordionPanel } from 'grommet'
import FileTree from '../FileTree/FileTree'

const setting = require('electron').remote.require('electron-settings')

const ExplorerContent = (props) => {
    return (
        <div>
                <AccordionPanel label= {props.label}>
                    {setting.get('filepaths.default') === '' ? 
                       
                        props.connectingComponent
                    :
                        <FileTree
                            getContent = {props.getContent}
                            getLink = {props.getLink}
                            getDocument = {props.getDocument}
                            path={setting.get('filepaths.default')}
                        />}
                
                </AccordionPanel>
        </div>
    );
};

export default ExplorerContent;
