const apiCards = 'https://www.deckofcardsapi.com/api/deck';
    let deckId = '';
    let currentCard = null;
    let nextCard = null;
    let round = 0;


    const valueMap = {
      'ACE': 14, 'KING': 13, 'QUEEN': 12, 'JACK': 11,
      '10': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
    };

    async function fetchJSON(url) {
        const resp = await fetch(url);
        console.log("deck fetched succesfully");
        
        if (!resp.ok) throw new Error('API error: ' + resp.status);
        return await resp.json();

      }

    function shuffledeck() {
        
    }

    function reset(){
        round = 0;
        document.getElementById('start-phase').style.display = 'block';
        document.getElementById('round-1-phase').style.display ='none'
        document.getElementById('round-2-phase').style.display = 'none'
        document.getElementById('round-3-phase').style.display = 'none'
        document.getElementById('round-4-phase').style.display = 'none'
        

    }

    async function startgame() {
        reset();
        fetchJSON();
        // get a new deck shuffled
        const data = await fetchJSON(`${apiCards}/new/shuffledeck/?deck_count1}`)
        deckId = data.deck_id;
         drawOne('currentCard').then(() => {
        document.getElementById('startGame').style.display = 'none';
        document.getElementById('round-1-phase').style.display = 'block'
      });
    }

    async function drawOne(target) {
        const data = await fetchJSON(`${apiBase}/${deckId}/draw/?count=1`);
        if (data.cards.length === 0) {
          document.getElementById('message').textContent = 'No more cards. Game over!';
          return;
        }
        const card = data.cards[0];
        document.getElementById(target).src = card.image;
        if (target === 'currentCard') currentCard = card;
        else nextCard = card;
      }

      function evaluateGuess(guessType){
        const valueCurrentCard = valueMap[currentCard.value];
        const valueNextCard = valueMap[nextCard.value];

        let correct = false;
        //check conditions
        if (guessType === 'higher') correct = valueNextCard>valueCurrentCard
        else if (guessType === 'lower') correct = valueNextCard<valueCurrentCard
        else if(guessType === 'same') correct = valueNextCard == valueCurrentCard
      }


   
        
 