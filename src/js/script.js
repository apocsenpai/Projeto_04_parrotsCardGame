let numberOfCards = numberOfCardsSelector();

//palhaçadinhas
const wrongAudio = document.getElementById("wrongAudio");
const rightAudio = document.getElementById("rightAudio");
const winAudio = document.getElementById("winAudio");

//array qie irá receber os índices das cartas
let cardsIndex = [];
let index = 0;

// quantidade de clicks
let qntdClicks = 0;

// quantidade de jogadas certas
let qntdJogadasCertas = 0;

// Array que vai receber as cartas clicadas
let clickedCardsArray = [];

const gameTable = document.querySelector(".main-content");
prepareTheGame();
function numberOfCardsSelector() {
  let numberOfCards = prompt(
    `Digite um número par entre 4 e 14 (inclusos) de cartas: `
  );
  //Verifica se o número se enquadra nos requisitos
  while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0) {
    numberOfCards = prompt(
      `Digite um número par entre 4 e 14 (inclusos) de cartas:`
    );
  }
  return numberOfCards;
}

function prepareTheGame() {
  // introduz os índices para referenciar as cartas
  while (cardsIndex.length < numberOfCards) {
    cardsIndex.push(index, index);
    index++;
  }
  index = 0;
  // chama a função que embaralha
  cardsIndex.sort(shuffler);

  //forEach para iterar a array usando a função que
  // coloca os cards na tela
  cardsIndex.forEach(cardsDealer);
  //Seleciona todos os cards
  const cards = document.querySelectorAll(".card");
  //itera entre os cards passando a função que vira
  // a carta
  cards.forEach(flipCard);
}

// embaralha os itens da array
function shuffler() {
  return Math.random() - 0.5;
}

// coloca os cards na tela
function cardsDealer(individualCardIndex) {
  gameTable.innerHTML += `
    <div class="card">
    <div class="face face-back">
      <img src="./src/images/back.png" alt="" class="back-img" />
    </div>
    <div class="face face-front">
      <img class="front-img" src="./src/images/${individualCardIndex}.gif" alt="" />
      <p>${individualCardIndex}</p>
    </div>
  </div>`;
}

// Vira a carta
function flipCard(card) {
  card.addEventListener("click", function () {
    const clickedCard = this.querySelector(".front-img").getAttribute("src");
    if (this.classList.contains("clicked") !== true) {
      this.classList.add("clicked");
      clickedCardsArray.push(clickedCard);
      pairComparison();
      qntdClicks++;
    }
  });
}

// compara as cartas e chama a função para desvirar
// caso as cartas sejam diferentes
function pairComparison() {
  if (clickedCardsArray.length === 2) {
    if (clickedCardsArray[0] !== clickedCardsArray[1]) {
      wrongAudio.play();
      setTimeout(undoFlipCards, 1000);
    } else {
      console.log(rightAudio);
      rightAudio.play();
      clickedCardsArray = [];
      qntdJogadasCertas++;
      wonThaGame();
    }
  }
}

// desvira as cartas selecionadas
function undoFlipCards() {
  clickedCardsArray.forEach((element) => {
    const clickedCard = document.querySelector(`.clicked img[src='${element}']`)
      .parentNode.parentNode;
    clickedCard.classList.remove("clicked");
  });
  clickedCardsArray = [];
}

//Mensagem que mostra se ele ganhou
function wonThaGame() {
  if (qntdJogadasCertas === numberOfCards / 2) {
    winAudio.play();
    setTimeout(() => {
      alert(
        `Você ganhou em ${qntdClicks} jogadas! E terminou em ${minute}m${second}s${millisecond}`
      );
      tryAgain();
    }, 3000);
  }
}
//variaveis para o cronometro
let millisecond = 0;
let second = 0;
let minute = 0;

let stopwatchInterval = setInterval(stopwatch, 10);
// conta o tempo desde o começo do game
function stopwatch() {
  millisecond += 10;
  if (millisecond === 1000) {
    second++;
    millisecond = 0;
    document.querySelector(".second").innerHTML = second;
    if (second === 60) {
      minute++;
      second = 0;
      document.querySelector(".minute").innerHTML = minute;
    }
  }
  document.querySelector(".millisecond").innerHTML = millisecond;
}

function tryAgain() {
  let resposta = prompt("Gostaria de tentar novamente?");
  if (resposta === "sim") {
    reset();
    numberOfCards = numberOfCardsSelector();
    prepareTheGame();
  } else if (resposta === "não") {
    window.close();
  } else {
    tryAgain();
  }
}

function reset() {
  millisecond = 0;
  minute = 0;
  second = 0;
  qntdClicks = 0;
  qntdJogadasCertas = 0;
  cardsIndex = [];
  gameTable.innerHTML = "";
  document.querySelector(".second").innerHTML = 0;
  document.querySelector(".minute").innerHTML = 0;
  document.querySelector(".millisecond").innerHTML = 0;
}
