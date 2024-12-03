import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PlayGamePage.css'; // Import the CSS for Pokémon theme
import wallpaper from '../assets/wallpaper.jpg';

const PlayGamePage = () => {
    const navigate = useNavigate(); // Hook for navigation
  
    // Function to navigate to the login page
    const handlePlayGame = () => {
      navigate('/login'); // Navigate to the login page
    };
  
    return (
      <div className="play-game-page">
        <div className="pokemon-theme">
          
          <h1>Welcome to the Pokémon Memory Game!</h1>
          
          {/* Play Game button */}
          <button className="start-button" onClick={handlePlayGame}>
            Play Game
          </button>
        </div>
      </div>
    );
  };
  
  export default PlayGamePage;