import React, { useState, useEffect } from "react";
import "../styles/Game.css";
import Cards from "../components/Cards.jsx";
import Score from "../components/Score.jsx";
import GameOver from "../components/GameOver.jsx";
import { Link } from "react-router-dom";

function Game() {
    const [cardData, setCardData] = useState([]); // Stores shuffled cards
    const [flippedCards, setFlippedCards] = useState([]); // Tracks flipped cards
    const [matchedCards, setMatchedCards] = useState([]); // Tracks matched cards
    const [score, setScore] = useState(0); // Game score
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [mistakes, setMistakes] = useState(0); // Tracks number of mistakes
    const [isGameOver, setIsGameOver] = useState(false); // Game over state

    // Fetch data from API and initialize cards
    useEffect(() => {
        fetchCardData();
    }, []);

    // Fetch cards and shuffle
    const fetchCardData = async () => {
        setIsLoading(true); // Set loading state
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random/9");
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
        } catch (error) {
            console.error("Error fetching card data:", error);
        } finally {
            setIsLoading(false); // Data loaded
        }
    };

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
        } else {
            setMistakes((prev) => {
                const newMistakes = prev + 1;
                if (newMistakes >= 10) {
                    setIsGameOver(true); // Trigger game over
                }
                return newMistakes;
            });
        }

        setTimeout(() => {
            setFlippedCards([]);
        }, 1000);
    };

    // Check if a card is flipped or matched
    const isFlipped = (card) =>
        flippedCards.some((c) => c.uniqueId === card.uniqueId) || matchedCards.includes(card.id);

    // Reset the game
    const resetGame = () => {
        setFlippedCards([]);
        setMatchedCards([]);
        setScore(0);
        setMistakes(0);
        setIsGameOver(false);
        fetchCardData();
    };




    return (
        <div className="main">

            <div className="header">

                <button className="back_btn">
                    <Link to="/" className="back_link">
                        Back
                    </Link>
                </button>

                <Score score={score} />
                <h2>Mistakes: {mistakes} / 10</h2>
                <button onClick={resetGame}>Reset game</button>

            </div>


            {isGameOver ? (
                <div className="game_over">
                    <GameOver />
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default Game;
