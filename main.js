// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        autoHideMenuBar: false // true to hide, press Alt to show when hidden
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open DevTools automatically (comment out if you don't want it)
    mainWindow.webContents.openDevTools()

}

// Called when Electron is ready to create browser windows.
app.whenReady().then(() => {


    createWindow()

    // Check original template for MacOS stuff!
})

// Example functions for communication between main and renderer (backend/frontend)
ipcMain.handle('get-stuff-from-main', () => 'Stuff from main!')
ipcMain.handle('send-stuff-to-main', async(event, data) => console.log(data))
    //click handler
ipcMain.handle('btn-click', async() => {
    console.log('button clicked recieved in main')
})


app.on('window-all-closed', function() {
    app.quit()
        // Check original template for MacOS stuff!
})