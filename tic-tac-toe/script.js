const container = document.getElementById("game-container");
const result = document.getElementById("result")
const reset = document.getElementById("reset");

//gameStats
let player;
let gameState; 
let winningState;
let totalClick;


function initializeGame(){
    player = "x";
    gameState = ["", "", "", "", "", "", "", "", ""]
    winningState = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]]
    
    totalClick = 0


    container.addEventListener("click", handleClick)
    result.classList.add("hidden")
}



function switchPlayer(){
    player = player === "x" ? "o" : "x";
}



function handleClick(event){
    if(event.target !== container){
        totalClick++

        //change innertext of clicked element
        event.target.innerText = player
        
        //update the Game sate
        let index = Number(event.target.dataset.index)
        gameState[index] = player
        

        checkWinningCondition()

        switchPlayer()
    }
}



function checkWinningCondition(){
    for (let state of winningState){

        //check if any of the winning state is made my the current player
        if(gameState[state[0]]===player && gameState[state[1]]===player && gameState[state[2]]===player){
            console.log("player " + player + "wins" )
            result.innerText = `Player ${player} wins!`;
            result.classList.remove("hidden")

            //adding color to winning combination of boxes
            for(let i=0; i<3;i++){
                container.children[state[i]].classList.add("winning-move")
            }

            container.removeEventListener("click", handleClick)
            break;
        }
        else{
            if(totalClick >=9){
                result.innerText = `The Game is draw!`;
                result.classList.remove("hidden")

                container.removeEventListener("click", handleClick)
                break;
            }
        }
    }
}



//main
initializeGame()

reset.addEventListener("click", ()=>{
    initializeGame()

    //clear prev game output
    for(let i=0; i<9;i++){
        container.children[i].innerText = ""
        container.children[i].classList.remove("winning-move")
    }
})