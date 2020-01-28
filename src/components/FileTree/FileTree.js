import React, { PureComponent } from 'react';
// import getStructure from 'json-dir-tree-react'
import { Treebeard } from 'react-treebeard';
import memoize from "memoize-one";
import './FileTree.scss'
const fs = window.require('fs');
var path = require('path');

//  NOTE: The getFileSize and getStructure are from 'json-dir-tree-react'.
//      Currently the import doesnt work, I think it has something to do with Babel

class FileTree extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            jsonTree : [],
        }
        this.onToggle = this.onToggle.bind(this);
    }

getFileSize= (file)=>{
    const stats = fs.statSync(file)
    const fileSizeInBytes = stats.size
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(fileSizeInBytes, 10) || 0;
    while(n >= 1024 && ++l)
        n = n/1024;
    return(n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
    }
    

getStructure = (fs, dir, callback) => {
        var results = [];
        var localPath = '';
        var total = { files: 0, folders: 0 };
        let thisState = this; // Can't bind this, and arrow functions don't work
    
        fs.readdir(dir, function (err, list) {
            if (err) return callback(err);
    
            var itemsLeft = list.length;
    
            if (!itemsLeft) return callback(null, {name: path.basename(dir), type: 'folder', children: results}, total);
    
            list.forEach(function (file) {
                file = path.resolve(dir, file);
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        thisState.getStructure(fs, file, function (err, res, tot) {
                            total.folders = total.folders + tot.folders + 1;
                            total.files = total.files + tot.files;
                            results.push({ name: path.basename(file), type: 'folder', children: res, children_count: res.length, created_at: stat.birthtime, local_path: file });
                            if (!--itemsLeft) callback(null, results, total);
                        });
                    }
                    else {
                        var ext = path.extname(file||'').split('.');
                        results.push({ type: 'file', name: path.basename(file), size: thisState.getFileSize(file), created_at: stat.birthtime, file_type: ext[ext.length - 1], local_path: file });
                        total.files++;
                        if (!--itemsLeft) callback(null, results, total);
                    }
                });
            });
        });
    }
    
    getJsonStruc = () =>{
        let thisState = this; // Can't bind this, and arrow functions don't work
        thisState.getStructure(fs,this.props.path,
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