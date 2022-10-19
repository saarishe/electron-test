// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fetch = require('electron-fetch').default
const Store = require('electron-store')

const { TIMEOUT } = require('dns')
const { crash } = require('process')

//ska egentligen vara i .env (egentligen vår url)
const API_URL = "https://jellyfish-app-gpkr6.ondigitalocean.app"
const store = new Store() //electron localstorage

//store.set('jwt', null)
//email: doe.man@gmail.fi
//password": 1234

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1800,
        height: 1600,
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

//click handler
ipcMain.handle('btn-click', async () => {
    console.log('button clicked recieved in main')
})

//Get notes
ipcMain.handle('get-cabins', async () => {
    console.log('get-cabins (main)')
    try {
        const resp = await fetch(API_URL + '/cabins', { 
            headers: {'Authorization': 'Bearer ' + store.get('jwt')},
            timeout: 3000 
        })
        const cabin = await resp.json()
        return cabin
        
    } catch (error) {
        console.log(error.message)
        return false
    }
})

//Log in
ipcMain.handle('app-login', async (event, data) => {
    console.log('app-login (main)')
    try {
        const resp = await fetch(API_URL + '/users/login', { 
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(data),
            timeout: 3000 
        })
        const user = await resp.json()
        console.log(user)

        if(resp.status > 201) {
            //console.log("Login failed.")
            return user
        }

        store.set('jwt', user.token) //store token 
        return false //log in succeeded

    } catch (error) {
        console.log(error.message)
        //return {'msg' : "Login failed"}
    }
})


app.on('window-all-closed', function () {
    app.quit()
})