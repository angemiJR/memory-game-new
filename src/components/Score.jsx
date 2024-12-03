import React from "react";
// import "../styles/Score.css";

function Score({ score }) {
    return (
        <div className="score-container">
            <h2>Score: {score}</h2>
        </div>
    );
}

export default Score;
