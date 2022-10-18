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
 
getCabins = async() =>{
    console.log('getCabins')
    const cabins =  await window.exposed.getCabins()
    console.log(cabins)

    if (!cabins) {
        document.querySelector('#logindiv').style.display = 'block'
        return
    }

    let cabinsHTML = "No cabins to show..."
    for (cabin in cabins) {
        cabinsHTML += `
            <div class="cabins">${cabin['adress']}</div>
        `
    }

    document.querySelector('#cabin').innerHTML = cabinsHTML
}
getCabins()


document.querySelector('#btn-test').addEventListener('click', async() =>{
    document.querySelector('#msg').innerText = ''
    const login_fail = await window.exposed.notesLogin({
        email : document.querySelector('#email').value, 
        password : document.querySelector('#pws').value
    })
    if(!login_fail){
        document.querySelector('#msg').innerText = login_fail.msg
    }
    document.querySelector('#cabin').innerHTML = getCabins()

    document.querySelector('#logindiv').style.display = 'none'
})

postCabin = async() =>{
    console.log('postCabins')
    const cabinPost = await window.exposed.postCabin()
    console.log(cabinPost)
}
//postCabin()