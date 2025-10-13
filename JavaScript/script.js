const canvas = document.getElementById('carte')
const ctx = canvas.getContext('2d')

let img = new Image()
img.src = "../images/CarteAuTresor.jpg"

img.onload = function(){
    ctx.drawImage(img,0,0, canvas.width, canvas.height)
}


