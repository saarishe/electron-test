/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
 
getCabins = async() =>{
    console.log('getCabins')
    const cabins =  await window.exposed.getCabins()
    console.log(cabins)

    if (!cabins) {
        document.querySelector('#logindiv').style.display = 'block'
        return
    }

    let cabinsHTML = ""
    for (const cabin of cabins) {
        cabinsHTML += `
            <div class="cabin"> <p style="font-size: 1.5em;"> Stuga: ${cabin['adress']} </p> Sorlek: ${cabin['size']}m2 <br> Pris: ${cabin['price']}€</div>
            <input type="button" id="boka" class="cabin-btn" value="Boka">
        `
    }

    document.querySelector('#cabin').innerHTML = cabinsHTML
}
//getCabins()


document.querySelector('#btn-test').addEventListener('click', async() =>{
    document.querySelector('#failmsg').innerText = ''
    const login = await window.exposed.appLogin({
        email : document.querySelector('#email').value, 
        password : document.querySelector('#pws').value
    })
    if(login){
        document.querySelector('#failmsg').innerText = 'Something went wrong'
        return
    } else {
        document.querySelector('#logindiv').style.display = 'none'
        getCabins()
    }
})
