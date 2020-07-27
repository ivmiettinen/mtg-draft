import React, { useState, useEffect } from "react";
import PlayerCards from "./PlayerCards";
import cardServiceClient from "../services/cardServiceClient";
import ConfirmGame from "./ConfirmGame";
import WaitingGame from "./WaitingGame";

export const FileGatheringBox = () => {
  const [playerAmount, setPlayerAmount] = useState();
  // const [numberToServer, setnumberToServer] = useState([]);
  const [showPlayerPage, setshowPlayerPage] = useState(false);
  const [newPlayer, addNewPlayer] = useState([]);
  const [waitingGame, setWaitingGame] = useState(false);
  const [linkForPlayers, setLinkForPlayers] = useState();

  // useEffect(() => {
  //     cardServiceClient.create().then(response => {
  //         setNotes(response.data)
  //     })
  // }, [])

  const handleNumberChange = (e) => {
    // console.log('number clicked:', e.target.value);
    setPlayerAmount(e.target.value);
  };

  const handlePlayerNameChange = (e) => {
    console.log("value:", e.target.value);
    addNewPlayer(e.target.value);
  };

  const handlePlayerAmount = async (e) => {
    e.preventDefault();

    const playerObject = {
      content: Number(playerAmount),
    };

    console.log("personObject", playerAmount);

    try {
      cardServiceClient
        .create(playerObject)
        .then((response) => setLinkForPlayers(response));
    } catch (error) {
      console.log("There was on error on posting:", error);
    }

    setshowPlayerPage(!false);
  };

  // const handlePlayerAmount = (e) => {
  //   e.preventDefault();

  //   const playerObject = {
  //     content: Number(playerAmount),
  //   };

  //   console.log('personObject', playerAmount);

  //   cardServiceClient.create(playerObject).then((response) => setLinkForPlayers(response)).catch((error) => {
  //     console.log('There was on error on posting:', error);
  //   });

  //   setshowPlayerPage(!false)
  // };

  const handleGameParticipation = (e) => {
    e.preventDefault();

    // console.log('handleGameParticipation', e)

    const confirmObject = {
      content: newPlayer,
      time: new Date(),
    };

    cardServiceClient.create(confirmObject).catch((error) => {
      console.log("there was an error confirming your participation", error);
    });

    setWaitingGame(true);
    // addNewPlayer('')
  };

  console.log("showPlayerPage", showPlayerPage);

  if (showPlayerPage === false) {
    return (
      <div>
        <PlayerCards
          handleClick={handlePlayerAmount}
          handleNumberChange={handleNumberChange}
        />
      </div>
    );
  }

  if (showPlayerPage === true && waitingGame === false) {
    return (
      <div>
        <ConfirmGame
          gameParticipation={handleGameParticipation}
          playerAmount={playerAmount}
          newPlayer={newPlayer}
          handlePlayerNameChange={handlePlayerNameChange}
        />
      </div>
    );
  } else if (showPlayerPage === true && waitingGame === true) {
    return (
      <div>
        <WaitingGame playerAmount={playerAmount} newPlayer={newPlayer} />
      </div>
    );
  }
};

export default FileGatheringBox;
