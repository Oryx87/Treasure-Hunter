const canvas = document.getElementById('carte')
const ctx = canvas.getContext('2d')

let img = new Image()
img.src = "./images/CarteAuTresor.jpg"

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


        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        console.log("Position clic : " + x + " " + y)

        const dx = x - tresor[0]
        const dy = y - tresor[1]

        distance = Math.sqrt(dx**2 + dy**2)
        console.log(distance)

        if (distance < 10){
            indice.innerHTML = `😎 Bravo, vous avez trouvé le trésor ! 💯`
            drawTreasureChestAnimated(tresor[0], tresor[1]);
        } else if (distance < 30 && distance > 10){
            indice.innerHTML = `🔥🔥 Brûlant ! 🔥🔥`
        } else if (distance < 50 && distance > 30){
            indice.innerHTML = `🔥 Chaud 🔥`
        } else if (distance < 100 && distance > 50){
            indice.innerHTML = `❄️ Tiède ❄️`
        } else{
            indice.innerHTML = `🥶 Glacé 🥶`
        }

        if (nbClick === 0 && distance >= 10) {
            indice.innerHTML = `😢 Vous avez échoué ! 👎`;
            drawTreasureChestAnimated(tresor[0], tresor[1]);
        }
    })
}

const btnRelaunch= document.getElementById("btn-relaunch")

btnRelaunch.addEventListener("click", () =>{
    window.location.reload();
})

/*
function drawTreasureChest(x, y) {
    let chestPosImg = new Image();
    chestPosImg.src = './images/PositionTresor.png';

    chestPosImg.onload = () => {
        ctx.drawImage(chestPosImg, tresor[0]-25, tresor[1]-25,50,50);
    };
}
*/

let animating = false;
let scale = 1;
let growing = true;

function drawTreasureChestAnimated(x, y) {
    const chestPosImg = new Image();
    chestPosImg.src = './images/PositionTresor.png';

    chestPosImg.onload = () => {
        animating = true;

        function animate() {
            if (!animating) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            if (growing) {
                scale += 0.01;
                if (scale >= 1.5) growing = false;
            } else {
                scale -= 0.01;
                if (scale <= 1) growing = true;
            }

            ctx.globalAlpha = 0.8 + 0.2 * Math.sin(Date.now() / 200);
            
            const size = 50 * scale;
            ctx.drawImage(chestPosImg, x - size / 2, y - size / 2, size, size);

            ctx.globalAlpha = 1;

            requestAnimationFrame(animate);
        }

        animate();
    };
}



clickMap();