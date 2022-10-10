// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fetch = require('electron-fetch').default
const Store = require('electron-store')

const { TIMEOUT } = require('dns')
const { crash } = require('process')

//ska egentligen vara i .env (egentligen vår url)
const API_URL = "http://localhost:3030/"
const store = new Store() //electron localstorage

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
})

// Example functions for communication between main and renderer (backend/frontend)
ipcMain.handle('get-stuff-from-main', () => 'Stuff from main!')
ipcMain.handle('send-stuff-to-main', async (event, data) => console.log(data))

//click handler
ipcMain.handle('btn-click', async () => {
    console.log('button clicked recieved in main')
})

//Get notes
ipcMain.handle('get-notes', async () => {
    console.log('get-notes (main)')
    try {
        const resp = await fetch(API_URL + '/notes', { 
            headers: {'Authorization': 'Bearer ' + store.get('jwt')},
            timeout: 3000 
        })
        const notes = await resp.json()

        return notes
    } catch (error) {
        console.log(error.message)
        return false
    }
})

//Log in
ipcMain.handle('notes-login', async (event, body) => {
    console.log('notes-login (main)')
    try {
        const resp = await fetch(API_URL + '/users/login', { 
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(data),
            timeout: 3000 
        })
        const user = await resp.json()
        if(resp.status > 201) return false

        console.log(user)
        store.set('jwt', user.token) //store token 
        return false //log in succeeded

    } catch (error) {
        console.log(error.message)
        return {'msg' : "Log in failed"}
    }
})


app.on('window-all-closed', function () {
    app.quit()
    // Check original template for MacOS stuff!
})