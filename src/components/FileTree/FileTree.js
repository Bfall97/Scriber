import React, { PureComponent } from 'react';
import { getStructure } from 'json-dir-tree-react'
import { Treebeard } from 'react-treebeard';
import memoize from "memoize-one";
import './FileTree.scss'

const fs = window.require('fs');

class FileTree extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            jsonTree : [],
        }
        this.onToggle = this.onToggle.bind(this);
    }


    
    getJsonStruc = () =>{
        let thisState = this; // Can't bind this, and arrow functions don't work
        getStructure(fs,this.props.path,
            function(err,structure){
                if (err) console.log(err)
                if (thisState.state.jsonTree === [] || thisState.state.jsonTree !== structure){
                    thisState.setState({jsonTree:structure})
                }
            })
        }

        //  This is deprecated!! 
    componentWillReceiveProps(oldPath, newPath){
        if(oldPath !== this.props.path) this.getJsonStruc()
    }

    //  These Did Not Work!
    // componentDidUpdate(prevProps){
    //     if (this.props.path !== prevProps.path){this.getJsonStruc()}
    // }

    // shouldComponentUpdate(oldProps){
    //     return oldProps !== this.props.path
    // }

    onToggle(node, toggled){
        console.log(this.state)
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }

        node.active = true;
        if (node.children) { 
            node.toggled = toggled; 
        }

        this.setState(() => ({cursor: node, data: Object.assign({}, data)}),()=>{
            if (node.type === 'file') this.props.getDocument(node)
        });

    }
    

    render() {
        return (
            <div className='tree'>
                <Treebeard
                    data={this.state.jsonTree}
                    onToggle={this.onToggle}
                />
            </div>
        );
    }
}

export default FileTree;