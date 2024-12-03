import React, { useState, useEffect } from "react";
import "../styles/Game.css";
import Cards from "../components/Cards.jsx";
import Score from "../components/Score.jsx";

function Game() {
    const [cardData, setCardData] = useState([]); // Stores shuffled cards
    const [flippedCards, setFlippedCards] = useState([]); // Tracks flipped cards
    const [matchedCards, setMatchedCards] = useState([]); // Tracks matched cards
    const [score, setScore] = useState(0); // Game score
    const [isDisabled, setIsDisabled] = useState(false); // Prevent clicks during checks

    // Initialize the cards on component mount
    useEffect(() => {
        const cardContent = [
            { id: 1, content: "Ditto" },
            { id: 2, content: "Abilities: Limber" },
            { id: 3, content: "Height: 3 units" },
        ];

        // Duplicate and shuffle cards
        const shuffledCards = shuffleArray([...cardContent, ...cardContent].map((card, index) => ({
            ...card,
            uniqueId: index,
        })));

        setCardData(shuffledCards);
    }, []);

    // Shuffle an array 
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Handle card click
    const handleCardClick = (card) => {
        if (isDisabled || flippedCards.some((c) => c.uniqueId === card.uniqueId)) return;

        const newFlippedCards = [...flippedCards, card];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setIsDisabled(true);
            checkForMatch(newFlippedCards);
        }
    };

    // Check if two flipped cards match
    const checkForMatch = (cards) => {
        const [firstCard, secondCard] = cards;

        if (firstCard.id === secondCard.id) {
            setMatchedCards((prev) => [...prev, firstCard.id]);
            setScore((prevScore) => prevScore + 1);
        }

        // Reset flipped cards after a short delay
        setTimeout(() => {
            setFlippedCards([]);
            setIsDisabled(false);
        }, 1000);
    };

    // Check if a card is flipped or matched
    const isFlipped = (card) => flippedCards.some((c) => c.uniqueId === card.uniqueId) || matchedCards.includes(card.id);

    return (
        <div className="main">
            <div className="header">
               
                <Score score={score} />
            </div>
            <div className="cards">
                {cardData.map((card) => (
                    <Cards
                        key={card.uniqueId}
                        content={card.content}
                        isFlipped={isFlipped(card)}
                        onClick={() => handleCardClick(card)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Game;
