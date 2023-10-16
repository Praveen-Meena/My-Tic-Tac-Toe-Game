const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info"); 
const newGameBtn = document.querySelector(".btn"); 


let currentPlayer; 
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8], 
    [0,3,6],
    [1,4,7],
    [2,5,8], 
    [0,4,8],
    [2,4,6]
]; 

// let's create a function to initialize the Game 
function initGame(){
    currentPlayer = "X"; 
    gameGrid = ["","","","","","","","",""];
    // UI pr sare box EMpty bhi karna padega
    boxes.forEach((box,index) => {
        box.innerText = ""; 
        boxes[index].style.pointerEvents = "all"; 

        box.classList = `box box${index+1}`;  //initialize all box properties
    });

    newGameBtn.classList.remove("active");                         // Initially New Game button is Hided
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame(); 

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O"; 
    }
    else{
        currentPlayer = "X"; 
    }
    // UI Update of Current Player Turn is now
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = ""; 

    // position is the Winner array combination of Index
    winningPositions.forEach( (position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            
                // check isf winner is X
                if(gameGrid[position[0]] ==="X"){
                    answer = "X"; 
                }
                else{
                    answer = "O"; 
                }

                // Disable pointer Event for all box
                boxes.forEach( (box)=>{
                    box.style.pointerEvents = "none"; 
                })

                // Now we Know the Winner So we Change Their background to Green
                boxes[position[0]].classList.add("win"); 
                boxes[position[1]].classList.add("win"); 
                boxes[position[2]].classList.add("win"); 
            } 
    });

    // if we have winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`; 
        newGameBtn.classList.add("active"); 
        return; 
    }

    //check when there is no winner and match tied
    let fillCount=0; 
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillCount++; 
    });

    // If board is fill match is Tie
    if(fillCount===9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active"); 
    }

}

function handleClick(index){
    if(gameGrid[index]===""){           //only able to  Insert value when it is Empty
        boxes[index].innerText = currentPlayer; 
        gameGrid[index] = currentPlayer; 
        boxes[index].style.pointerEvents = "none";

        swapTurn();                //Chnage the Player turn
        checkGameOver();                        //check winning
    }
}

// Sabhi boxes pr eventListner laga diya
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
}); 


newGameBtn.addEventListener("click", initGame); 







