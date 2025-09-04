const apiCards = "https://www.deckofcardsapi.com/api/deck";
let deckId = "";
let revealedCards = [];

const data = [];

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
    const data = await fetchJSON(`${apiBase}/new/shuffle/?deck_count=1`);
    deckId = data.deck_id;
    // make sure no cards are revealed
    revealedCards = [];
    document.getElementById("status_label").innerText = "Game started! Guess Red or Black.";
  }

  async function revealCard(slotId) {
    const data = await fetchJSON(`${apiBase}/${deckId}/draw/?count=1`);
    const card = data.cards[0];
    revealedCards.push(card);
    document.querySelector(`#${slotId} img`).src = card.image;
    return card;
  }

  async function guessColor(color) {
    const card = await revealCard("card1");
    const isRed = (card.suit === "HEARTS" || card.suit === "DIAMONDS");
    const correct = (color === "red" && isRed) || (color === "black" && !isRed);
    document.getElementById("status_label").innerText = correct ? "Correct! Higher or Lower?" : alert('wrong');
  }

  async function guessHigherLower(choice){
    const card1 = revealedCards[0];
    const card2 = revealCards[1];
    const cardVal1 = valueMap[card1.value];
    const cardVal2 = valueMap[card2.value];

    const correct = (choice === "higher" && cardVal2 > cardVal1) || (choice === "lower" && cardVal1 < cardVal1);
  document.getElementById("status_label").innerText = correct ? "Correct! Inside or Outside?" : window.location.reload;
  }

 async function guessInsideOutside(choice){
    const card2 = revealedCards[1]
    const card3 = revealedCards[2]
    
    const cardValue2 = valueMap[card2.value];
    const cardValue3 = valueMap[card3.value];
    const correct = (choice === 'inside' && cardValue2 )
 }

 async function guessSuits() {
    
 }
document.getElementById("start_button").onclick = startGame();

document.getElementById("guessRed").onclick = () => guessColor("red");
document.getElementById("guessBlack").onclick = () => guessColor("black");

document.getElementById("guessHigher").onclick = () => guessHigherLower("higher");
document.getElementById("guessLower").onclick = () => guessHigherLower("lower");

document.getElementById("guessInside").onclick = () => guessInsideOutside("inside");
document.getElementById("guessOutside").onclick = () => guessInsideOutside("outside");

document.getElementById("guessHearts").onclick = () => guessSuit("hearts");
document.getElementById("guessSpades").onclick = () => guessSuit("spades");
document.getElementById("guessDiamonds").onclick = () => guessSuit("diamonds");
document.getElementById("guessClubs").onclick = () => guessSuit("clubs");
