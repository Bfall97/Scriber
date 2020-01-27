import { fileRead, defaultFolderRead } from '../../LocalFileSystem.js'
const { remote } = require('electron')
const { app, Menu } = remote

const isMac = process.platform === 'darwin'

// const template = [
//   {
//     label: 'File',
//     submenu: [
//       {
//         label: 'Open',
//         accelerator: 'Ctrl+O',
//         click() { openFile(); }
//       },
//       {
//         label: 'Save',
//         accelerator: 'Ctrl+S',
//         click() { saveFile(); }
//       }
//     ]
//   },
//   {
//     label: 'Edit',
//     submenu: [
//       {
//         label: 'Undo',
//         accelerator: 'Ctrl+Z',
//         role: 'undo'
//       },
//       {
//         label: 'Redo',
//         accelerator: 'Shift+Ctrl+Z',
//         role: 'redo'
//       },
//       {
//         type: 'separator'
//       },
//       {
//         label: 'Cut',
//         accelerator: 'Ctrl+X',
//         role: 'cut'
//       },
//       {
//         label: 'Copy',
//         accelerator: 'Ctrl+C',
//         role: 'copy'
//       },
//       {
//         label: 'Paste',
//         accelerator: 'Ctrl+V',
//         role: 'paste'
//       },
//       {
//         label: 'Select All',
//         accelerator: 'Ctrl+A',
//         role: 'selectall'
//       },
//     ]
//   }
// ];

// if (process.platform == 'darwin') {
//   var name = app.getName();
//   template.unshift({
//     label: name,
//     submenu: [
//       {
//         label: 'About ' + name,
//         role: 'about'
//       },
//       {
//         type: 'separator'
//       },
//       {
//         label: 'Services',
//         role: 'services',
//         submenu: []
//       },
//       {
//         type: 'separator'
//       },
//       {
//         label: 'Hide ' + name,
//         accelerator: 'Command+H',
//         role: 'hide'
//       },
//       {
//         label: 'Hide Others',
//         accelerator: 'Command+Alt+H',
//         role: 'hideothers'
//       },
//       {
//         label: 'Show All',
//         role: 'unhide'
//       },
//       {
//         type: 'separator'
//       },
//       {
//         label: 'Quit',
//         accelerator: 'Command+Q',
//         click() { app.quit(); }
//       },
//     ]
//   });
// }

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
            {
        label: 'Open',
        accelerator: 'Ctrl+O',
        click() { fileRead(); }
      },
      {
        label: 'Save',
        accelerator: 'Ctrl+S',
<<<<<<< HEAD
        click() { saveFile(); }
=======
        // click() { saveFile(); }
>>>>>>> 815dd7e... Massive Revision for the project
      },
      isMac ? {label: 'Close', role: 'close' } : { label: 'Quit',role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'Ctrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+Ctrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'Ctrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'Ctrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'Ctrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'Ctrl+A',
        role: 'selectall'
      },
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { label: 'Reload',
        accelerator: 'Ctrl+R',
        role: 'reload',
      },
      { 
        label: 'Toggle Dev Tools',
        accelerator: 'Ctrl+I',
        role: 'toggledevtools',

     },
      { type: 'separator' },
      { label: 'Reset Zoom',accelerator: 'Ctrl+NumPad0', role: 'resetzoom' },
      { label: 'Zoom In', accelerator: 'Ctrl+=', role: 'zoomin' },
      { label: 'Zoom Out', accelerator: 'Ctrl+-',role: 'zoomout' },
      { type: 'separator' },
      { label: 'Toggle Full Screen', accelerator: 'F11', role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  },
]
    if (process.platform == 'darwin') {
    var name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() { app.quit(); }
        }
    ]
  });
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

export default template
