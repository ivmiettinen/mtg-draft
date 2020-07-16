import React from "react";

// import {Card, Button} from 'react-bootstrap'

export const PlayerCards = ({ handleClick, handleNumberChange }) => {
  return (
    <div>
      <h2 className="topicToSetPlayers">Magic the gathering</h2>
      <div>
        <h3 style={{ color: "lightblue" }}>
          How many players you want to draft with?
        </h3>
        <form onSubmit={handleClick}>
          {" "}
          <button
            className="buttonToSetPlayers"
            value={2}
            onClick={handleNumberChange}
          >
            2 players{" "}
          </button>
          <button
            className="buttonToSetPlayers"
            value={3}
            onClick={handleNumberChange}
          >
            3 players{" "}
          </button>
          <button
            className="buttonToSetPlayers"
            value={4}
            onClick={handleNumberChange}
          >
            4 players{" "}
          </button>
          <button
            className="buttonToSetPlayers"
            value={5}
            onClick={handleNumberChange}
          >
            5 players{" "}
          </button>
          <button
            className="buttonToSetPlayers"
            value={6}
            onClick={handleNumberChange}
          >
            6 players{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerCards;
