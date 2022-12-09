let modal = document.getElementById("modal")
let btnStart = document.getElementById("start-game")
let btnREStart = document.getElementById("restart-game")
let player = document.getElementById("player")
let winModal = document.getElementById("win")
let timeEl = document.getElementById("time")
let screen = document.body



btnStart.addEventListener("click", initGame)
btnREStart.addEventListener("click", ()=>{location.reload()})

function initGame() {
    modal.style.display = "none"
    player.style.display = "block"
    winModal.style.display = "none"

   

    let GameEnd = false
    let timeIterator = 1
    setInterval(()=>{
        if (!GameEnd) {
            timeIterator++
            timeEl.textContent = timeIterator
        }
      
    },100)

    let initColor = Math.floor(Math.random() * (150 - 0) + 0)

    let randomColor
    let playerColor

    player.style.top = Math.round(Math.random()* (window.innerHeight - 0) + 0)+"px"
    player.style.left = Math.round(Math.random()* (window.innerWidth - 0) + 0)+"px"


    if (initColor < 50) {

        randomColor = `rgb(${getRnadomColor()},10,${getRnadomColor()})`
        playerColor = `rgb(${getRnadomColor()},10,${getRnadomColor()})`
    } else if (initColor < 100) {

        randomColor = `rgb(10,${getRnadomColor()},${getRnadomColor()})`
        playerColor = `rgb(10,${getRnadomColor()},${getRnadomColor()}})`
    } else {
        randomColor = `rgb(${getRnadomColor()},${getRnadomColor()},10)`
        playerColor = `rgb(${getRnadomColor()},${getRnadomColor()},10})`
    }



    screen.style.background = randomColor
    player.style.background = playerColor

    player.onmousedown = function (event) {

        let shiftX = event.clientX - player.getBoundingClientRect().left;
        let shiftY = event.clientY - player.getBoundingClientRect().top;

        player.style.position = 'absolute';
        document.body.append(player);

        moveAt(event.pageX, event.pageY);


        function moveAt(pageX, pageY) {
            player.style.left = pageX - shiftX + 'px';
            player.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {

            rect = player.getBoundingClientRect();
            

            if (initColor < 50) {

                player.style.background = `rgb(${(rect.left - window.innerHeight) / (0 - window.innerHeight) * (255 - 0) + 0},10,${(rect.top - window.innerWidth) / (0 - window.innerWidth) * (255 - 0) + 0})`
            } else if (initColor < 100) {
                player.style.background = `rgb(10,${(rect.left - window.innerHeight) / (0 - window.innerHeight) * (255 - 0) + 0},${(rect.top - window.innerWidth) / (0 - window.innerWidth) * (255 - 0) + 0})`
            } else {
                player.style.background = `rgb(${(rect.left - window.innerHeight) / (0 - window.innerHeight) * (255 - 0) + 0},${(rect.top - window.innerWidth) / (0 - window.innerWidth) * (255 - 0) + 0},10)`
            }

            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        player.onmouseup = function () {

           

            let regexDigts = /\d+/gm
            
            let playerColors = [...player.style.background.matchAll(regexDigts)]
            let screenColors = [...randomColor.matchAll(regexDigts)]

            if(playerColors[0][0] >= screenColors[0][0]-10 && playerColors[0][0] <= screenColors[0][0]+10 &&  playerColors[1][0] >= screenColors[1][0]-10 && playerColors[1][0] <= screenColors[1][0]+10 && playerColors[2][0] >= screenColors[2][0]-10 && playerColors[2][0] <= screenColors[2][0]+10 ){
               GameEnd = true
                winModal.style.display = "block"
            }


            document.removeEventListener('mousemove', onMouseMove);
            player.onmouseup = null;
        };

    };

    player.ondragstart = function () {
        return false;
    };
}

function getRnadomColor() {
    return Math.floor(Math.random() * (225 - 100) + 100)
}