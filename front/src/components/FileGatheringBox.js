import React, { useState, useEffect } from "react";
import PlayerCards from "./PlayerCards";
import cardServiceClient from "../services/cardServiceClient";
import ConfirmGame from "./ConfirmGame";
import WaitingGame from "./WaitingGame";
import UrlPageForHost from "./UrlPageForHost";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const FileGatheringBox = () => {
  const [playerAmount, setPlayerAmount] = useState();
  // const [numberToServer, setnumberToServer] = useState([]);
  const [showPlayerPage, setshowPlayerPage] = useState(false);
  const [newPlayer, addNewPlayer] = useState([]);
  const [confirmGame, setConfirmGame] = useState(false);
  const [linkForPlayers, setLinkForPlayers] = useState();
  const [waitingLounge, setwaitingLounge] = useState(false)

  // useEffect(() => {
  //     cardServiceClient.create().then(response => {
  //         setNotes(response.data)
  //     })
  // }, [])

  // console.log("LINKKI", linkForPlayers);

  const handleRegistration = (e) => {
    console.log('registeration', e.target.value)
    setConfirmGame(!false)
  }



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

    const numberObject = {
      content: Number(playerAmount),
    };

    console.log("personObject", playerAmount);

    try {
      cardServiceClient
        .createNumber(numberObject)
        .then((response) => setLinkForPlayers(response));
    } catch (error) {
      // setErrorMessage(`Player amount has already been posted to server`)
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

    console.log('handleGameParticipation', e)

    const confirmObject = {
      content: newPlayer,
      time: new Date(),
    };

    cardServiceClient.createPlayer(confirmObject).catch((error) => {
      console.log("there was an error confirming your participation", error);
    });


    setwaitingLounge(true);
    
    // setConfirmGame(true);
    // addNewPlayer('')
  };

  console.log("showPlayerPage", showPlayerPage);

  

  if (showPlayerPage === false) {
    return (
      <div>
        <PlayerCards
          handleClick={handlePlayerAmount}
          handleNumberChange={handleNumberChange}
          linkForPlayers={linkForPlayers}
        />
      </div>
    );
  }

  if (showPlayerPage === true && confirmGame === false) {
    return (
      <div>
        <UrlPageForHost linkForPlayers={linkForPlayers} handleRegistration={handleRegistration} />

        {/* <Router>
        <li>
        <li>
            <Link to="/ConfirmGame">ConfirmGame</Link>
          </li>
        </li>
        <Switch>
          <Route exact path="/ConfirmGame">
            <ConfirmGame
              gameParticipation={handleGameParticipation}
              playerAmount={playerAmount}
              newPlayer={newPlayer}
              handlePlayerNameChange={handlePlayerNameChange}
            />
          </Route>
        </Switch>
        </Router> */}


        
{/* <WaitingGame playerAmount={playerAmount} newPlayer={newPlayer} />

        */}
        
      </div>
    );
  } if (showPlayerPage === true && confirmGame === true && waitingLounge === false) {
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
  } if(showPlayerPage === true && confirmGame === true && waitingLounge === true ) {
    return (
      <div>
        <WaitingGame playerAmount={playerAmount} newPlayer={newPlayer} />
      </div>
    );
  }
  return(
    <div>
      
    </div>
  )
};

export default FileGatheringBox;
