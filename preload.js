/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('exposed', {

    getCabins: () => {
        return ipcRenderer.invoke('get-cabins')
    },
 
    appLogin: (data) => {
        ipcRenderer.invoke('app-login', data)
    }

})