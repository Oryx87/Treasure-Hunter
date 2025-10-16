const canvas = document.getElementById('carte')
const ctx = canvas.getContext('2d')

let img = new Image()
img.src = "../images/CarteAuTresor.jpg"

img.onload = function(){
    ctx.drawImage(img,0,0, canvas.width, canvas.height)
}

let nbClickLeft = document.getElementById('nbClickLeft')

let nbClick = 15
nbClickLeft.innerHTML = `${nbClick} / 15`

let tresor = [Math.round(Math.random() * canvas.width), Math.round(Math.random() * canvas.height)]
console.log("Position Tresor : " + tresor[0] + " " + tresor[1])

const indice = document.getElementById("description")

function clickMap(){
    canvas.addEventListener('click', (event) =>{
        if (nbClick <= 0) return

        nbClick = nbClick - 1
        nbClickLeft.innerHTML = `${nbClick} / 15`

        if (nbClick == 0){
            alert("Vous avez échoué !")
        }

        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        console.log("Position clic : " + x + " " + y)

        const dx = x - tresor[0]
        const dy = y - tresor[1]

        distance = Math.sqrt(dx**2 + dy**2)
        console.log(distance)

        if (distance < 10){
            alert("Bravo, vous avez trouvé le trésor !")
        } else if (distance < 30 && distance > 10){
            indice.innerHTML = `Brûlant !`
        } else if (distance < 50 && distance > 30){
            indice.innerHTML = `Chaud`
        } else if (distance < 100 && distance > 50){
            indice.innerHTML = `Tiède`
        } else{
            indice.innerHTML = `Glacé`
        }
    })
}

clickMap();
