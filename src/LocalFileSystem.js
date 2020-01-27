const fs = window.require('fs');
const app = require('electron').remote; 
const {dialog} = require('electron').remote;
const path = require('path')
const setting = require('electron').remote.require('electron-settings')

function fileWrite(content){
<<<<<<< HEAD
    dialog.showSaveDialog((fileName) => {
=======
    let path = dialog.showSaveDialogSync((fileName) => {
>>>>>>> 815dd7e... Massive Revision for the project
        if (fileName === undefined){
            console.log("You didn't save the file");
            return;
        }
<<<<<<< HEAD
    
        // fileName is a string that contains the path and filename created in the save file dialog.
        fs.writeFile(fileName, content, (err) => {
            if(err){
                alert("An error occurred creating the file "+ err.message)
            }
            alert("The file has been succesfully saved");
        });
    }); 
}

//ASync so it cant return. idk
function openFile(filepath){

=======
    }); 
    // fileName is a string that contains the path and filename created in the save file dialog.
    fs.writeFile(path, content, (err) => {
        if(err){
            console.log("An error occurred creating the file "+ err.message)
        }
        console.log("The file has been succesfully saved");
        console.log(path)
        return path;
    });
}


function openFile(filepath){
>>>>>>> 815dd7e... Massive Revision for the project
    let data = fs.readFileSync(filepath,'utf8')
    return data
}

<<<<<<< HEAD

=======
function getStats(filepath){
    console.log(filepath)
    const stats = fs.statSync(filepath)
    return stats
}
>>>>>>> 815dd7e... Massive Revision for the project

function fileRead(){
    dialog.showOpenDialog((fileNames) => {
        // fileNames is an array that contains all the selected
        if(fileNames === undefined){
            console.log("No file selected");
            return;
        }
    
        var filepath = fileNames[0]
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if(err){
                alert("An error occurred reading the file :" + err.message);
                return;
            }
            
            // Change how to handle the file content
            console.log("The file content is : " + data);
        });
    });
}

<<<<<<< HEAD
function fileUpdate(){
    var filepath = "C:/Previous-filepath/existinfile.txt";// you need to save the filepath when you open the file to update without use the filechooser dialog again
    var content = "This is the new content of the file";

    fs.writeFile(filepath, content, (err) => {
        if (err) {
            alert("An error occurred updating the file" + err.message);
=======
function fileUpdate(filepath, content){
    fs.writeFile(filepath, content, (err) => {
        if (err) {
            console.log("An error occurred updating the file" + err.message);
>>>>>>> 815dd7e... Massive Revision for the project
            console.log(err);
            return;
        }

<<<<<<< HEAD
        alert("The file has been succesfully saved");
=======
        console.log("The file has been succesfully saved");
>>>>>>> 815dd7e... Massive Revision for the project
    });
}


function fileDelete(filepath){
    if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {
            if (err) {
<<<<<<< HEAD
                alert("An error occurred updating the file" + err.message);
=======
                console.log("An error occurred updating the file" + err.message);
>>>>>>> 815dd7e... Massive Revision for the project
                console.log(err);
                return;
            }
            console.log("File succesfully deleted");
        });
    } else {
<<<<<<< HEAD
        alert("This file doesn't exist, cannot delete");
}
}

//TODO this is all messed up, async? -- elctron version
=======
        console.log("This file doesn't exist, cannot delete");
}
}

// Sets default directory in electron settings.
>>>>>>> 815dd7e... Massive Revision for the project
function defaultFolderRead(){
    // if(setting.get('filepaths.default')===''){
     
        var filepath = dialog.showOpenDialogSync({
                    title:"Select a folder",
                    properties: ["openDirectory"]
                })
        if(filepath === undefined){
                        console.log("No destination folder selected");
                        alert("No destination folder selected");
                        return;
                    }else{
<<<<<<< HEAD
                        console.log("filepath set");
                        setting.set('filepaths',{
                            default:filepath[0],
                        })
=======
                        setting.set('filepaths',{
                            default:filepath[0],
                        })
                    console.log("filepath set: ", setting.get('filepaths.default'));
>>>>>>> 815dd7e... Massive Revision for the project
                        }
            return;
}



function readFilesSync(dir) {
    const files = [];
    fs.readdirSync(dir).forEach(filename => {
      const name = path.parse(filename).name;
      const ext = path.parse(filename).ext;
      const filepath = path.resolve(dir, filename);
      const stat = fs.statSync(filepath);
      const isFile = stat.isFile();
  
      if (isFile) files.push({ filepath, name, ext, stat });
    });
    return files;
    
  }

export {
    fileWrite,
    fileRead,
    fileUpdate,
    fileDelete,
    defaultFolderRead,
    readFilesSync,
<<<<<<< HEAD
    openFile
=======
    openFile,
    getStats
>>>>>>> 815dd7e... Massive Revision for the project
}