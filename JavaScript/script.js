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

let tresor = [Math.random() * canvas.width, Math.random() * canvas.height]
console.log(tresor)

canvas.addEventListener('click', () =>{
    nbClick = nbClick - 1
    nbClickLeft.innerHTML = `${nbClick} / 15`
})
