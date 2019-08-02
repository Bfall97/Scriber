
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const contextMenu = require('electron-context-menu')
const path = require('path')
const url = require('url')

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
    width: 600,
    height: 800,
    minWidth: 600,
    minHeight: 300,
    titleBarStyle: 'customButtonsHover',
    webPreferences: {
      nodeIntegration: true
    },
    autoHideMenuBar: true,
    frame: false
  })

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../public/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  mainWindow.on('closed', () => {
    mainWindow = null
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
