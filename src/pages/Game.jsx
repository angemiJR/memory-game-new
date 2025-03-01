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
    const [mistakes, setMistakes] = useState(0); // Tracks number of mistakes
    const [isGameOver, setIsGameOver] = useState(false); // Game over state
    const [time, setTime] = useState(0); // Timer state
    const [successMessage, setSuccessMessage] = useState(""); // Success message state


    // Fetch data from API and initialize cards
    useEffect(() => {
        fetchCardData();
    }, []);

    // Timer
    useEffect(() => {
        if (isGameOver) return;

        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup on component unmount or when game ends
    }, [isGameOver]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    // Fetch data and shuffle
    const fetchCardData = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9");
            const data = await response.json();

            // Map the results to card content
            const cardContent = await Promise.all(
                data.results.map(async (pokemon, index) => {
                    const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());
                    return {
                        id: index, // Unique ID for each card pair
                        content: pokemonDetails.sprites.front_default, // 
                    };
                })
            );

            // Duplicate and shuffle cards
            const shuffledCards = shuffleArray(
                [...cardContent, ...cardContent].map((card, index) => ({
                    ...card,
                    uniqueId: index, // Unique ID for each card instance
                }))
            );

            setCardData(shuffledCards);
        } catch (error) {
            console.error("Error fetching data:", error);
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
            setMatchedCards((prev) => {
                const updatedMatches = [...prev, firstCard.id];

                // Check if all cards are matched
                if (updatedMatches.length === cardData.length / 2) {
                    setIsGameOver(true);
                    setSuccessMessage(`Great job! Your time is ${formatTime(time)}. Can you beat that?`);
                }

                return updatedMatches;
            });
            setScore((prev) => prev + 1);
        } else {
            setMistakes((prev) => {
                const newMistakes = prev + 1;
                if (newMistakes >= 15) {
                    setIsGameOver(true);
                }
                return newMistakes;
            });
        }

        setTimeout(() => setFlippedCards([]), 1000);
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
        setTime(0); // Reset time
        setSuccessMessage(""); // Reset success message
        fetchCardData();

    };

    return (
        <div className="main">
            <div className="header">
                <Link to="/" className="back_link">
                    <button className="back_btn">Back</button>
                </Link>
                {/* <Score score={score} /> */}
                <h2>Mistakes: {mistakes} / 15</h2>
                <h2>Time: {formatTime(time)}</h2>
                <button onClick={resetGame}>Reset game</button>
            </div>

            {isGameOver && matchedCards.length === cardData.length / 2 ? (
                <div className="success_message">
                    <h2>{successMessage}</h2>
                    <button onClick={resetGame} className="play_again_btn">Play Again</button>
                </div>
            ) : isGameOver ? (
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
