let numberOfCards = prompt(
  `Digite um número par entre 4 e 14 (inclusos) de cartas: `
);

//array qie irá receber os índices das cartas
let cardsIndex = [];
let index = 0;

const gameTable = document.querySelector(".main-content");

//Verifica se o número se enquadra nos requisitos
while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0) {
  numberOfCards = prompt(`Digite um número par, por favor`);
}

//introduz os índices para referenciar as cartas
while (cardsIndex.length < numberOfCards) {
  cardsIndex.push(index);
  cardsIndex.push(index);
  index++;
}

// chama a função que embaralha
cardsIndex.sort(shuffler);


// função que embaralha os itens da array
function shuffler() {
  return Math.random() - 0.5;
}
