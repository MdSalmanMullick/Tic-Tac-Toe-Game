const box =  document.querySelector(".selectbox"),
buttonX = box.querySelector(".X"),
buttonO = box.querySelector(".O"),
playboard = document.querySelector(".playboard"),
players = document.querySelector(".players"),
board = document.querySelectorAll("section span"),
result = document.querySelector(".result"),
ifwon = result.querySelector(".won"),
replay = result.querySelector("button");
window.onload = ()=> {
    for (let i = 0; i<board.length; i++) {
        board[i].setAttribute("onclick", "clickedBox(this)");
    }
}

    buttonX.onclick = ()=> {
        box.classList.add("hide");
        playboard.classList.add("show");
    }
    buttonO.onclick = ()=> {
        box.classList.add("hide");
        playboard.classList.add("show");
        players.setAttribute("class", "players active player");
    }
let XIcon = "fas fa-times";
let OIcon = "fas fa-circle";
let Sign = "X";
let AIactive = true;
function clickedBox(element){
    if (players.classList.contains("player")){
        Sign = "O";
        element.innerHTML = `<i class="${OIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", Sign);
    }else{
        element.innerHTML = `<i class="${XIcon}"></i>`;
        element.setAttribute("id", Sign);
        players.classList.add("active");
    }
    DeclareWinner();
    element.style.pointerEvents = "none";
    playboard.style.pointerEvents = "none";
    let delay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() =>{
        ai(AIactive);
    },delay);
}
function ai(AIactive) {
    let a = [];
    if (AIactive){
        Sign = "O";
        for (let i = 0; i < board.length; i++) {
            if (board[i].childElementCount==0){
                a.push(i);
        }
    }
    let random = a[Math.floor(Math.random() * a.length)];
    if (a.length > 0){
        if (players.classList.contains("player")){
            Sign = "X";
            board[random].innerHTML = `<i class="${XIcon}"></i>`;
            board[random].setAttribute("id", Sign);
            players.classList.add("active");
        }else{
            board[random].innerHTML = `<i class="${OIcon}"></i>`;
            players.classList.remove("active");
            board[random].setAttribute("id", Sign);
        }
        DeclareWinner();
        // minimax(board, Sign).index;
    }
    board[random].style.pointerEvents = "none";
    playboard.style.pointerEvents = "auto";
    Sign = "X";
    }
}
function getId(idname){
    return document.querySelector(".box" + idname).id;
}
function checkId(val1, val2, val3, sign){
    if (getId(val1)==sign && getId(val2)==sign && getId(val3)==sign){
        return true;
    }
}
function DeclareWinner(){
    if (checkId(1, 2, 3, Sign) || checkId(4, 5, 6, Sign) || checkId(7, 8, 9, Sign) || checkId(1, 5, 9, Sign) || checkId(3, 5, 9, Sign) || checkId(1, 4, 7, Sign) || checkId(2, 5, 8, Sign) ||  checkId(3, 6, 9, Sign)){
        AIactive = false;
        ai(AIactive);
        setTimeout(() =>{
            result.classList.add("show");
            playboard.classList.remove("show");
        },700);
        ifwon.innerHTML = `Player <p>${Sign}</p> won the game`; 
    }else{
        if (getId(1)!="" && getId(2)!="" && getId(3)!="" && getId(4)!="" && getId(5)!="" && getId(6)!="" && getId(7)!="" && getId(8)!="" && getId(9)!=""){
            AIactive = false;
            ai(AIactive);
            setTimeout(() =>{
            result.classList.add("show");
            playboard.classList.remove("show");
        },700);
        ifwon.textContent = `Draw`;
        }
    }
}
replay.onclick = () => {
    window.location.reload();
}
// function minimax(newBoard, Sign){
//     var availablespot = newBoard[random];
//     if (DeclareWinner(newBoard, Sign)){
//         return {score: -10};
//     }else if (checkId(newBoard, Sign)){
//         return {score:10};
//     }else if (availablespot.length ===0){
//         return {score:0};
//     }
//     var moves = [];
//     for (var i = 0; i < availablespot.length; i++){
//         var move = {};
//         move.index = newBoard[availablespot[i]];
//         newBoard[availablespot[i]] = Sign;
//         if (Sign == Sign){
//             var result = minimax(newBoard, Sign);
//             move.score = result.score;
//         }else{
//             var result = minimax(newBoard, Sign);
//             move.score = result.score;
//         }
//         newBoard[availablespot[i]] = move.index;
//         moves.push(move);
//     }
//     var bestMove;
//     if (Sign === Sign){
//         var bestscore = -10000;
//         for (var i = 0; i < moves.length; i++){
//             if (moves[i].score > bestscore){
//                 bestscore = moves[i].score;
//                 bestMove = i;
//             }
//         }
//     }else {
//         var bestscore = 10000;
//         for (var i = 0; i < moves.length; i++){
//             if (moves[i].score < bestscore){
//                 bestscore = moves[i].score;
//                 bestMove = i;
//             }
//         }
//     }
//     return moves[bestMove];
// }