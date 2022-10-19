/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
 
getCabins = async() =>{
    const cabins =  await window.exposed.getCabins()
    //console.log(cabins)

    if (!cabins) {
        document.querySelector('#logindiv').style.display = 'block'
        return
    }

    let cabinsHTML = ""
    for (const cabin of cabins) {
        cabinsHTML += `
            <div class="cabin"> <p style="font-size: 1.5em;"> Stuga: ${cabin['adress']} </p> Sorlek: ${cabin['size']}m2 <br> Pris: ${cabin['price']}€</div>
            <input type="button" id="${cabin['_id']}" class="cabin-btn" value="Boka">
        `
    }
    /*cabinsHTML += `
    <div class="cabin"></div>
    <input type="button" id="cabin-create" class="cabin-btn" value="Lägg till ny stuga">
    `*/
    document.querySelector('#cabin').innerHTML = cabinsHTML
}
//getCabins()


document.querySelector('#btn-test').addEventListener('click', async() =>{
    document.querySelector('#failmsg').innerText = ''
    const login_failed = await window.exposed.appLogin({
        email : document.querySelector('#email').value, 
        password : document.querySelector('#pws').value
    })

    if(login_failed){
        console.log("Something went wrong")
        document.querySelector('#failmsg').innerText = login_failed.msg
        return
    }
    
    document.querySelector('#logindiv').style.display = 'none'
    console.log("getCabins")
    getCabins()
})

/*document.querySelectorAll('.cabin-btn').addEventListener('click', booking())

function booking(){
    let bookingHTML = `<h2>Välj tjänst</h2>
    <form action="">
        <input type="checkbox" id="clean"> <label for="clean">Städning</label> <br>
        <input type="checkbox" id="lawn"> <label for="lawn">Gräsklippning</label> <br>
        <input type="checkbox" id="window"> <label for="window">Tvätta fönster</label> <br>
        <label>Datum</label>
        <input type="date">
    </form>
    <button id="submit-btn" type="button">Beställ</button>
    `
    document.querySelector('#cabin').innerHTML = bookingHTML
}*/