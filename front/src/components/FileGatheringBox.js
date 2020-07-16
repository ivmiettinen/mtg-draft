import React, { useState, useEffect } from "react";
import PlayerCards from "./PlayerCards";
import cardServiceClient from "./services/cardServiceClient";

export const FileGatheringBox = () => {
  const [playerAmount, setPlayerAmount] = useState("");
  const [notes, setNotes] = useState([]);
  const [numberToServer, setnumberToServer] = useState([]);

  // useEffect(() => {
  //     cardServiceClient.create().then(response => {
  //         setNotes(response.data)
  //     })
  // }, [])

  const handleNumberChange = (e) => {
    console.log("number clicked:", e.target.value);
    setPlayerAmount(e.target.value);
  };

  const handlePlayerAmount = (e) => {
    e.preventDefault();

    const playerObject = {
      content: Number(playerAmount),
    };

    console.log("personObject", playerAmount);

    cardServiceClient.create(playerObject).catch((error) => {
      console.log("There was on error on posting:", error);
    });
  };

  return (
    <div>
      <PlayerCards
        handleClick={handlePlayerAmount}
        handleNumberChange={handleNumberChange}
      />
    </div>
  );
};

export default FileGatheringBox;
