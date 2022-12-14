let modal = document.getElementById("modal")
let btnREStart = document.querySelectorAll("#restart-game")
let player = document.getElementById("player")
let winModal = document.getElementById("win")
let loss = document.getElementById("loss")
let screen = document.body
let diff

let difficulty = [999, 60, 30, 10, 3, 2, 1]

diffs.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e);
    if (e.submitter.id == "start-game") {
        initGame()
    }
    if (e.submitter.dataset) {
        diff = difficulty[Number(e.submitter.dataset.diff)]
    }
})


let _ = [...btnREStart].map(el=>{el.addEventListener("click", () => { location.reload() })})

let initColor = Math.floor(Math.random() * (150 - 0) + 0)

let randomColor
let playerColor
if (initColor < 50) {

    randomColor = `rgb(${getRnadomColor()},10,${getRnadomColor()})`
    playerColor = `rgb(${getRnadomColor()},10,${getRnadomColor()})`
} else if (initColor < 100) {

    randomColor = `rgb(10,${getRnadomColor()},${getRnadomColor()})`
    playerColor = `rgb(10,${getRnadomColor()},${getRnadomColor()})`
} else {
    randomColor = `rgb(${getRnadomColor()},${getRnadomColor()},10)`
    playerColor = `rgb(${getRnadomColor()},${getRnadomColor()},10)`
}

screen.style.background = randomColor
modal.querySelector("#content").style.background = randomColor
winModal.querySelector("#content").style.background = randomColor


function initGame() {
    modal.style.display = "none"
    player.style.display = "block"
    winModal.style.display = "none"

    let attempt = diff || difficulty[0]

    let regexDigts = /\d+/gm

    let screenColors = [...randomColor.matchAll(regexDigts)].map(el => el[0])
    console.log(screenColors)

    let GameEnd = false
    let timeIterator = 1
    setInterval(() => {
        if (!GameEnd) {
            timeIterator++
            winModal.querySelector("#time").textContent = timeIterator
        }
        if (!GameEnd) {
            timeIterator++
            loss.querySelector("#time").textContent = timeIterator
        }

    }, 100)



    player.style.top = Math.round(Math.random() * (window.innerHeight - 0) + 0) + "px"
    player.style.left = Math.round(Math.random() * (window.innerWidth - 0) + 0) + "px"




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


            attempt--


            let playerColors = [...player.style.background.matchAll(regexDigts)].map(el => el[0])


            if (Math.abs(playerColors[0] - screenColors[0]) < 5 && Math.abs(playerColors[1] - screenColors[1]) < 5 && Math.abs(playerColors[2] - screenColors[2] < 5)) {
                GameEnd = true
                winModal.style.display = "flex"
            } else

            if (attempt <= 0) {
                GameEnd = true
                loss.style.display = "flex"
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
    return Math.floor(Math.random() * (225 - 10) + 10)
}