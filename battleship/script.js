const container = document.querySelector(".grid-container");
const resetBtn = document.getElementById("reset");

const dialog = document.getElementById("result")
const msg = document.getElementById("msg") 


let clicks = 0;
let shipsFound = 0;
let shipPosition = new Set()

function checkWin(shipsFound){
    if(shipsFound >=5){
        dialog.classList.add("won")
        msg.innerHTML = "You won <br>Click 'Reset' to play again";
        dialog.show()
    }
}

function checkUsedAllries(clickCount){
    if(clickCount >= 8){
        dialog.classList.add("failed")
        msg.innerHTML = "You loose<br>Click 'Reset' to try again"
        dialog.show()
        container.removeEventListener("click", handleBoxClick)
    }
}


function handleBoxClick(event){
    event.target.style.zIndex=0;
    clicks++;
    if(event.target.classList.contains("ship")) shipsFound++
    checkWin(shipsFound)
    checkUsedAllries(clicks)
}

function handleReset(){
    dialog.close()
    
    //reset stats
    clicks=0;
    shipsFound=0;
    
    //flush the ship position
    shipPosition.clear();
    
    //delete the current boxes from DOM
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }

    //remove the classes added to dialog during last game
    dialog.removeAttribute("class")

    //start new game
    startGame()
}






function startGame(){

    //find position where to spawn the ships
    for(let i=0; i<16; i++){
        shipPosition.add(Math.floor(Math.random()*16))
        if(shipPosition.size >= 5) break;
    }

    console.log(shipPosition)

    //creting the box elements
    for(let i=0; i<16; i++){
        let box = document.createElement("div");
        box.classList.add("item");
    
    
        let cover = document.createElement("div");
    
        if(shipPosition.has(i)){
            cover.classList.add("cover", "ship");
            box.appendChild(cover);
    
            let image = document.createElement("img");
            image.src = "ship.png";
            box.appendChild(image);
        }
        else{
            cover.classList.add("cover", "water");
            box.appendChild(cover);
    
            let image = document.createElement("img");
            image.src = "water.png";
            box.appendChild(image);
        }
        container.appendChild(box);
        
        //event listener for every box
        cover.addEventListener("click", handleBoxClick)
    }

}



startGame()
resetBtn.addEventListener("click", handleReset)