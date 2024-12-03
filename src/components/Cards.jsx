import "../styles/Cards.css";

function Cards({ content, isFlipped, onClick }) {
    return (
        <div className={`card ${isFlipped ? "show-back" : ""}`} onClick={onClick}>
            <div className="front"></div>
            <div className="back">{content}</div>
        </div>
    );
}

export default Cards;
