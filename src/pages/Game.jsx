import React, { useState, useEffect } from "react";
import "../styles/Game.css";
import Cards from "../components/Cards.jsx";
import Score from "../components/Score.jsx";

function Game() {
    const [cardData, setCardData] = useState([]); // Stores shuffled cards
    const [flippedCards, setFlippedCards] = useState([]); // Tracks flipped cards
    const [matchedCards, setMatchedCards] = useState([]); // Tracks matched cards
    const [score, setScore] = useState(0); // Game score
    const [isLoading, setIsLoading] = useState(true); // Loading state

    // Fetch data from API and initialize cards
    useEffect(() => {
        async function fetchCardData() {
            try {
                const response = await fetch("https://dog.ceo/api/breeds/image/random/6");
                const data = await response.json();
                const cardContent = data.message.map((imageUrl, index) => ({
                    id: index, // Unique ID for each card pair
                    content: imageUrl, // Image URL as content
                }));
                const shuffledCards = shuffleArray([...cardContent, ...cardContent].map((card, index) => ({
                    ...card,
                    uniqueId: index, // Unique ID for each card instance
                })));
                setCardData(shuffledCards);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching card data:", error);
                setIsLoading(false);
            }
        }

        fetchCardData();
    }, []);

    // Shuffle an array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5); 
    };

    // Handle card click
    const handleCardClick = (card) => {
        if (flippedCards.length === 2 || flippedCards.some((c) => c.uniqueId === card.uniqueId)) return;

        const newFlippedCards = [...flippedCards, card];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            checkForMatch(newFlippedCards);
        }
    };

    // Check if two flipped cards match
    const checkForMatch = (cards) => {
        const [firstCard, secondCard] = cards;

        if (firstCard.id === secondCard.id) {
            setMatchedCards((prev) => [...prev, firstCard.id]);
            setScore((prev) => prev + 1);
        }

        setTimeout(() => {
            setFlippedCards([]);
        }, 1000);
    };

    // Check if a card is flipped or matched
    const isFlipped = (card) =>
        flippedCards.some((c) => c.uniqueId === card.uniqueId) || matchedCards.includes(card.id);

    return (
        <div className="main">
            <div className="header">
                <Score score={score} />
            </div>
            <div className="cards">
                {isLoading ? (
                    <p>Loading cards...</p>
                ) : (
                    cardData.map((card) => (
                        <Cards
                            key={card.uniqueId}
                            content={card.content}
                            isFlipped={isFlipped(card)}
                            onClick={() => handleCardClick(card)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Game;
