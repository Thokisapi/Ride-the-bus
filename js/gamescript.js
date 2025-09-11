const apiCards = "https://www.deckofcardsapi.com/api/deck";
let deckId = "";
let revealedCards = [];
const data = [];
var coins = 0;

const valueMap = {
  ACE: 14,
  KING: 13,
  QUEEN: 12,
  JACK: 11,
  10: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

async function fetchJSON(url) {
  const resp = await fetch(url);
  return await resp.json();
}

async function startGame() {
  console.log("Game Started");
  document.getElementById("status_label").innerText =
    "Game started! Guess Red or Black.";
  const data = await fetchJSON(`${apiCards}/new/shuffle/?deck_count=1`);
  deckId = data.deck_id;
  showPhase(1);
  revealedCards = [];
}

async function revealCard(slotId) {
  const data = await fetchJSON(`${apiCards}/${deckId}/draw/?count=1`);
  const card = data.cards[0];
  revealedCards.push(card);
  document.querySelector(`#${slotId} img`).src = card.image;
  return card;
}

async function guessColor(color) {
  const card = await revealCard("card1");
  const isRed = card.suit === "HEARTS" || card.suit === "DIAMONDS";
  const correct = (color === "red" && isRed) || (color === "black" && !isRed);
  
  if (correct) {
    document.getElementById("status_label").innerText =
      "Correct! Higher or Lower?";
    showPhase(2);
  } else {
    document.getElementById("status_label").innerText = "Wrong! Game over.";
    showPhase(0);
    await revealCard("card1");
    alert("Wrong choice you lost!");
    reset();
  }
}

async function guessHigherLower(choice) {
  const card1 = revealedCards[0];
  const card2 = await revealCard("card2");

  const cardVal1 = valueMap[card1.value];
  const cardVal2 = valueMap[card2.value];

  const correct =
    (choice === "higher" && cardVal2 > cardVal1) ||
    (choice === "lower" && cardVal2 < cardVal1) ||
    (choice === "same" && cardVal1 == cardVal2);

  if (correct) {
    document.getElementById("status_label").innerText =
      "Correct! Inside or Outside?";
    showPhase(3);
  } else {
    document.getElementById("status_label").innerText = "Wrong! Game over.";
    showPhase(0);
    await revealCard("card2");
    alert("Wrong choice you lost!");
    reset();
  }
}

async function guessInsideOutside(choice) {
  const card1 = revealedCards[0];
  const card2 = revealedCards[1];
  const card3 = await revealCard("card3");

  const cardValue1 = valueMap[card1.value];
  const cardValue2 = valueMap[card2.value];
  const cardValue3 = valueMap[card3.value];

  const minVal = Math.min(cardValue1, cardValue2);
  const maxVal = Math.max(cardValue1, cardValue2);

  const inside = cardValue3 > minVal && cardValue3 < maxVal;

  const correct =
    (choice === "inside" && inside) || (choice === "outside" && !inside);

  if (correct) {
    document.getElementById("status_label").innerText =
      "Correct! Guess the Suit!";
    showPhase(4);
  } else {
    document.getElementById("status_label").innerText = "Wrong! Game over.";
      await revealCard("card3")
    alert("Wrong choice you lost!");
    showPhase(0);
    reset();

  }
}

async function guessSuits(choice) {
  const card = await revealCard("card4");

  const isHearts = card.suit === "HEARTS";
  const isDiamonds = card.suit === "DIAMONDS";
  const isSpades = card.suit === "SPADES";
  const isClubs = card.suit === "CLUBS";

  const correct =
    (choice === "hearts" && isHearts) ||
    (choice === "diamonds" && isDiamonds) ||
    (choice === "spades" && isSpades) ||
    (choice === "clubs" && isClubs);
  if (correct) {
    document.getElementById("status_label").innerText =
      "Correct! Guess the Suit!";
    await revealCard("card4");
    alert("Correct you won the game!")
    reset();
  } else {
    document.getElementById("status_label").innerText = "Wrong! Game over.";
    showPhase(0);
    await revealCard("card4");
    alert("Wrong choice you lost!");
    reset();

  }
}
function showPhase(phase) {
  ["start-phase", "round-1-phase","round-2-phase","round-3-phase","round-4-phase",  ].forEach((id) => {document.getElementById(id).classList.add("d-none")});

  if (phase === 0) {
    document.getElementById("start-phase").classList.remove("d-none");
  } else {
    document.getElementById(`round-${phase}-phase`).classList.remove("d-none");
  }
  
  currentPhase = phase;

  document.querySelectorAll( "#start-phase, #round-1-phase, #round-2-phase, #round-3-phase, #round-4-phase")

    .forEach((div) => (div.style.display = "none"));
  if (phase === 0)
    document.getElementById("start-phase").style.display = "flex";
  if (phase === 1)
    document.getElementById("round-1-phase").style.display = "flex";
  if (phase === 2)
    document.getElementById("round-2-phase").style.display = "flex";
  if (phase === 3)
    document.getElementById("round-3-phase").style.display = "flex";
  if (phase === 4)
    document.getElementById("round-4-phase").style.display = "flex";
}

function reset() {
  revealedCards = [];

  document.querySelector(`#card1 img`).src = "../images/backside.png";
  document.querySelector(`#card2 img`).src = "../images/backside.png";
  document.querySelector(`#card3 img`).src = "../images/backside.png";
  document.querySelector(`#card4 img`).src = "../images/backside.png";

  document.getElementById("status_label").innerText = "Click start to play!";
  showPhase(0);
}

function openModal() {
  const modal = document.getElementById('modal-gameRules')
  modal.style.display = "flex";
  console.log('modal clicked');
  
}
function closeModal() {
const modal = document.getElementById('modal-gameRules')
  modal.style.display = "none";
  console.log('modal closed');
  
}


document.getElementById("start_button").onclick = startGame;

document.getElementById("guessRed").onclick = () => guessColor("red");
document.getElementById("guessBlack").onclick = () => guessColor("black");

document.getElementById("guessHigher").onclick = () =>
  guessHigherLower("higher");
document.getElementById("guessLower").onclick = () => guessHigherLower("lower");
document.getElementById("guessSame").onclick = () => guessHigherLower("same");

document.getElementById("guessInside").onclick = () =>
  guessInsideOutside("inside");

document.getElementById("guessOutside").onclick = () =>
  guessInsideOutside("outside");

document.getElementById("guessHearts").onclick = () => guessSuits("hearts");
document.getElementById("guessSpades").onclick = () => guessSuits("spades");
document.getElementById("guessDiamonds").onclick = () => guessSuits("diamonds");
document.getElementById("guessClubs").onclick = () => guessSuits("clubs");

document.getElementById("rules_button").onclick = () => openModal();
document.getElementById("close-button").onclick = () => closeModal();

