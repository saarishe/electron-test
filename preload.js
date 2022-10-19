/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('exposed', {

    btnClick: () => {
        ipcRenderer.invoke('btn-click')
        console.log('button clicked (preload)')
    },

    getCabins: () => {
        return ipcRenderer.invoke('get-cabins')
    },
 
    appLogin: (data) => {
        ipcRenderer.invoke('app-login', data)
    },

    postCabin: () => {
        ipcRenderer.invoke('post-cabin')
    },

    // expose a function in main (node) to renderer
    getStuffFromMain: () => ipcRenderer.invoke('get-stuff-from-main'),

    // send data back to main
    sendStuffToMain: (data) => ipcRenderer.invoke('send-stuff-to-main', data)

})