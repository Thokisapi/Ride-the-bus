const apiBase = 'https://www.deckofcardsapi.com/api/deck';
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

    async function startgame(params) {
        
    }