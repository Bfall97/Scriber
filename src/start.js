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
    width: settings.get('lastScreenDimension.width'),
    height: settings.get('lastScreenDimension.height'),
    minWidth: 600,
    minHeight: 300,
    titleBarStyle: 'customButtonsHover',
    webPreferences: {
      nodeIntegration: true
    },
    autoHideMenuBar: true,
    frame: false,
    // fullscreen: true,
  })

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../public/index.html'),
      protocol: 'file:',
      slashes: true
    }),

    // Persistence
    settings.set('filepaths',{
      default : '',
    }),
    settings.set('tokens',{
      dropbox : 'HqkVb2MBXGAAAAAAAAAAV0Lj4ZNMkt8jY9WnDMHbCOZjvzgpAG12Xy1WVzcWPHIK',
    }),
    settings.set('currentTheme',{
      theme: settings.get('currentTheme.theme')
    }),
    settings.set('lastScreenDimensions',{
      width: settings.get('lastScreenDimensions.width'),
      height: settings.get('lastScreenDimensions.height')
    }),
    settings.set('customThemes',{
      savedThemes : [],
      activeTheme : ''
    }),

  )

  mainWindow.on('closed', () => {
    mainWindow = null
  },
  // TODO: Fix Window Resize Settings
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


