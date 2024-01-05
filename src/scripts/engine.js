
const state = {
    score:{
        playerScore: 0,
        enemyScore: 0,
        scorePoints: document.querySelector(".score-points")
    },
    cardInfo:{
        img: document.querySelector(".card-img"),
        name: document.querySelector(".card-name"),
        type: document.querySelector(".card-type")
    },
    sides:{
        player: document.querySelector(".player-side"),
        enemy: document.querySelector(".enemy-side")
    },
    fieldCards:{
        playerChosenCard: document.getElementById("player-field-card"),
        enemyChosenCard: document.getElementById("enemy-field-card")
    },
    actions:{
        resetBtn: document.querySelector(".reset-btn")
    }
}

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: "./src/assets/icons/dragon.png",
        winAgainst: 1,
        loseAgainst: 2
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Stone",
        img: "./src/assets/icons/magician.png",
        winAgainst: 2,
        loseAgainst: 0
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: "./src/assets/icons/exodia.png",
        winAgainst: 0,
        loseAgainst: 1
    }
];

let countCardId = 0;
let shuffledArray = [];

function shuffleArray(){
    while(shuffledArray.length < 3){
        let randomId = Math.floor(Math.random() * 3);
        if(!shuffledArray.includes(randomId)){
            shuffledArray.push(randomId);
        }
    }
}

function getRandomCardId(){

    let currentId = countCardId;
    countCardId++;

    return cardData[shuffledArray[currentId]].id;   

}

function removeCardsFromHand(){
    document.querySelectorAll(".cards-section").forEach(Element => Element.innerHTML = "");
}

function setCardsField(cardId){
    removeCardsFromHand();

    shuffleArray();
    let enemyCardId = getRandomCardId();

    state.fieldCards.playerChosenCard.style.display = "block";
    state.fieldCards.enemyChosenCard.style.display = "block";

    state.fieldCards.playerChosenCard.src = cardData[cardId].img;
    state.fieldCards.enemyChosenCard.src = cardData[enemyCardId].img;

    checkDuelResult(cardId, enemyCardId);
    state.actions.resetBtn.style.display = "block";

    countCardId = 0;
    shuffledArray = [];
}

function playSound(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.volume = 0.2;
    audio.play();
}

function checkDuelResult(playerCardId, enemyCardId){
    let playerCard = cardData[playerCardId];

    if(playerCard.winAgainst === enemyCardId){
        state.score.playerScore++;
        state.score.scorePoints.innerHTML = `Win: ${state.score.playerScore} | Lose: ${state.score.enemyScore}`;
        playSound("win");
    }else if(playerCard.loseAgainst === enemyCardId){
        state.score.enemyScore++;
        state.score.scorePoints.innerHTML = `Win: ${state.score.playerScore} | Lose: ${state.score.enemyScore}`;
        playSound("lose");
    }
}

function createCardImg(cardId, fieldSide){
    const cardImg = document.createElement("img");
    cardImg.setAttribute("height", "100px");
    cardImg.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImg.setAttribute("data-id", cardId);

    if(fieldSide === "player"){
        cardImg.classList.add("card");
        cardImg.addEventListener("click", () => {
            setCardsField(cardImg.getAttribute("data-id"));
        });
        cardImg.addEventListener("mouseover", () => {
            showCardInfo(cardId);
        });
    }

    return cardImg;
}

function showCardInfo(cardId){
    state.cardInfo.img.src = cardData[cardId].img;
    state.cardInfo.name.innerHTML = cardData[cardId].name;
    state.cardInfo.type.innerHTML = `Attribute: ${cardData[cardId].type}`;
    state.cardInfo.img.style.display = "block";
}

function drawCards(cardNumber, fieldSide){
    shuffleArray();

    for(let i = 0; i < cardNumber; i++){
        const cardId = getRandomCardId();
        const cardImg = createCardImg(cardId, fieldSide);

        if(fieldSide === "player"){
            state.sides.player.appendChild(cardImg);
        }else if(fieldSide === "enemy"){
            state.sides.enemy.appendChild(cardImg);
        }
    }
    countCardId = 0;
    shuffledArray = [];
}

function init(){
    drawCards(3, "player");
    drawCards(3, "enemy");
}

function resetData(){
    state.fieldCards.playerChosenCard.style.display = "none";
    state.fieldCards.enemyChosenCard.style.display = "none";

    state.cardInfo.img.style.display = "none";
    state.cardInfo.name.innerHTML = "card name";
    state.cardInfo.type.innerHTML = "card type";
}

function nextDuel(){
    if(document.querySelector(".cards-section").innerHTML === ""){
        resetData();
        init();
        state.actions.resetBtn.style.display = "none";
    }
}

init();