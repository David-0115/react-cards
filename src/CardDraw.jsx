import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';
import './CardDraw.css'

const CardDraw = () => {
    const [deck, setDeck] = useState({ deck_id: null, remaining: null })
    const [cards, setCards] = useState([]);
    const [cardVisible, setCardVisible] = useState(true)
    const newDeckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    const drawUrl = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`;

    useEffect(() => {
        async function newDeck() {
            const resp = await axios.get(newDeckUrl);
            setDeck(resp.data);
        }
        newDeck();
    }, []);

    useEffect(() => {
        if (deck.remaining === 0) {
            shuffle();
        }
    }, [deck.remaining])

    const getCard = async () => {
        const resp = await axios.get(drawUrl);
        deck.remaining--
        console.log(deck.remaining)
        setCards([...cards, <Card img={resp.data.cards[0].image} />])
    }




    const shuffle = async () => {
        setDeck({ deck_id: deck.deck_id, remaing: 0 })
        setCards([])
        const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`)
        setDeck(resp.data);
    }


    return (
        <div>

            {deck.remaining === 0 ? <p>Shuffling...</p>
                : <button onClick={getCard}>Get Card!</button>}
            {deck.remaining === null ? (
                <p>Loading...</p>
            ) : (
                cards.length > 0 ? (
                    cards.map((card, idx) => <div key={idx}>{card}</div>)
                ) : <p>Click button to draw a card</p>
            )}
            <div>
                <button className="shuffle-btn" onClick={shuffle}>Shuffle</button>
            </div>
        </div>
    );

}

export default CardDraw;

// onClick={getCard}

// const getCard = useEffect(() => {
//     async function newCard() {
//         const card = await axios.get(drawUrl)
//         setCards([...cards, <Card img={card.cards.images.png} />])
//         console.log(cards)
//         deck.remaining--
//         console.log(deck.remaining);
//     }
//     newCard();
// })

// useEffect(()=>{
//     async function shuffle(){
//         const shuffled = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`)
//         setDeck(shuffled);
//     }
//     shuffle();
// },[deck.remaining === 0])