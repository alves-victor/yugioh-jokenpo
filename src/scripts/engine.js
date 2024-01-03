
const state = {
    score:{
        playerScore: 0,
        enemyScore: 0,
        scoreBox: document.querySelector(".score-box")
    },
    cardInfo:{
        img: document.querySelector(".card-img"),
        name: document.querySelector(".card-name"),
        type: document.querySelector(".card-type")
    },
    fieldCards:{
        playerChosenCard: document.getElementById("player-field-card"),
        enemyChosenCard: document.getElementById("enemy-field-card")
    },
    actions:{
        resetBtn: document.querySelector(".reset-btn")
    }
}

function init(){
    
}

init();