/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

(async() => {
    console.log(await window.exposed.getStuffFromMain())

    await window.exposed.sendStuffToMain('Stuff from renderer')
})()
 
getNotes = async() =>{
console.log('getNotes')
const notes =  await window.exposed.getNotes()
console.log(notes)
}
getNotes()


document.querySelector('#btn-test').addEventListener('click', async() =>{
    document.querySelector('#msg').innerText = ' '
    const login_fail = await window.electron.notesLogin({
        email : document.querySelector('#email').value, 
        password : document.querySelector('#psw').value
    })
    if(login_fail){
        document.querySelector('#msg').innerText = login_fail.msg
    }
    getNotes()
})