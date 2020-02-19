const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const contextMenu = require('electron-context-menu')
const path = require('path')
const url = require('url')
const settings = require('electron-settings');

// Context Menu Electron Package
contextMenu({
  showCopyImageAddress: true,
  showSaveImageAs: true,
  showLookUpSelection: true

})

let mainWindow

function createWindow () {
  const { webContents } = require('electron')
  console.log(webContents)
  mainWindow = new BrowserWindow({
    show: false,
    // backgroundColor: '#2e2c29',
    backgroundColor: '#FFF',
    width: settings.get('lastScreenDimension.width') > 0 ? settings.get('lastScreenDimension.width') : 425,
    height: settings.get('lastScreenDimension.height') > 0 ? settings.get('lastScreenDimension.height') : 750 ,
    minWidth: 400,
    minHeight: 400,
    titleBarStyle: 'customButtonsHover',
    webPreferences: {
      nodeIntegration: true
    },
    autoHideMenuBar: true,
    frame: false,
    // fullscreen: true,
  })
  
  mainWindow.once('ready-to-show', ()=>{
    mainWindow.show();
    mainWindow.focus();
  })


  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../public/index.html'),
      protocol: 'file:',
      slashes: true
    }),
    

    // Data Persistence //
    settings.set('filepaths',{
      default : '',
    }),
    settings.set('tokens',{
      dropbox : '',
    }),
    settings.set('currentTheme',{
      theme: ''
    }),
    settings.set('lastScreenDimensions',{
      width: settings.get('lastScreenDimensions.width'),
      height: settings.get('lastScreenDimensions.height')
    }),
    settings.set('customThemes',{
      savedThemes : [],
      activeTheme : ''
    }),
    settings.set('recentDocs',{
      recentDocs : []
    }),

  )

  mainWindow.on('closed', () => {
    mainWindow = null
  },
  'resize', () => {
    settings.set('lastScreenDimensions',{
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
