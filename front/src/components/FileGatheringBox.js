import React, { useState, useEffect } from 'react';
import PlayerCards from './PlayerCards';
import cardServiceClient from '../services/cardServiceClient';
import ConfirmGame from './ConfirmGame';
import WaitingGame from './WaitingGame';
import UrlPageForHost from './UrlPageForHost';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
// import Routing from './Routing';

export const FileGatheringBox = () => {
  const [playerAmount, setPlayerAmount] = useState();
  // const [numberToServer, setnumberToServer] = useState([]);
  const [showPlayerPage, setshowPlayerPage] = useState(false);
  const [newPlayer, addNewPlayer] = useState([]);
  const [confirmGame, setConfirmGame] = useState(false);
  const [linkForPlayers, setLinkForPlayers] = useState();
  const [waitingLounge, setwaitingLounge] = useState(false);
  const [waitingNumber, setWaitingNumber] = useState(0);
  const [readyPlayers, setReadyPlayers] = useState([]);
  const [response, setResponse] = useState([]);
  const [endPoint, setEndpoint] = useState('http://localhost:3003/');

  // console.log('readyPlayers', readyPlayers.length);

  // console.log('readyPlayers', readyPlayers);

  useEffect(() => {
    const endPoint = 'http://localhost:3003/';
    const socket = socketIOClient(endPoint);
    console.log('Socketti1');
    socket.on('FromAPI', (data) => {
      // console.log('data:', data)
      setResponse(data);

      // const result = cardServiceClient.getPlayers();

      setReadyPlayers(data);
      console.log('Socketti2');
      console.log('setreadyplayers', data);
    });
  }, [readyPlayers]);

  const handlewaitingNumber = (e) => {
    console.log('waitingNumberHandle', e);
    setWaitingNumber((waitingNumber) => waitingNumber + 1);
  };

  //

  const handleRegistration = (e) => {
    console.log('registeration', e.target.value);
    setConfirmGame(!false);
  };

  const handleNumberChange = (e) => {
    // console.log('number clicked:', e.target.value);
    setPlayerAmount(e.target.value);
  };

  const handlePlayerNameChange = (e) => {
    console.log('value:', e.target.value);
    // sessionStorage.setItem('Player name:', e.target.value)

    addNewPlayer(e.target.value);
  };

  const handlePlayerAmount = async (e) => {
    e.preventDefault();

    const numberObject = {
      content: Number(playerAmount),
    };

    console.log('personObject', playerAmount);

    try {
      cardServiceClient
        .createNumber(numberObject)
        .then((response) => setLinkForPlayers(response));
    } catch (error) {
      // setErrorMessage(`Player amount has already been posted to server`)
      console.log('There was on error on posting:', error);
    }

    setshowPlayerPage(!false);
  };

  const handleGameParticipation = (e) => {
    e.preventDefault();

    console.log('handleGameParticipation', e);

    const confirmObject = {
      content: newPlayer,
      time: new Date(),
    };

    setWaitingNumber((waitingNumber) => waitingNumber + 1);

    let copyOfPlayerNames = [...readyPlayers];

    let mapPlayers = copyOfPlayerNames.map((param) => {
      return param.player;
    });

    console.log('param.content', mapPlayers);

    if (mapPlayers.includes(confirmObject.content)) {
      alert(`${newPlayer} is already in use`);
      return;
    }

    cardServiceClient
      .createPlayer(confirmObject)
      .then(setWaitingNumber((waitingNumber) => waitingNumber + 1))
      .catch((error) => {
        if (error.message === 'Request failed with status code 409') {
          alert(error.message + ': Player name is already in use.');
        } else {
          alert(error.message);
        }
      });

    setshowPlayerPage(true);
    setConfirmGame(true);
    setwaitingLounge(true);

    setWaitingNumber((waitingNumber) => waitingNumber + 1);
  };

  console.log('showPlayerPage', showPlayerPage);

  if (showPlayerPage === false) {
    return (
      <Router>
        <div>
          <Route path='/ConfirmGame' />

          {readyPlayers.length}
          <PlayerCards
            handleClick={handlePlayerAmount}
            handleNumberChange={handleNumberChange}
            linkForPlayers={linkForPlayers}
          />
        </div>
      </Router>
    );
  }

  if (showPlayerPage === true && confirmGame === false) {
    return (
      <Router>
        <div>
          <Redirect from='/' to='/UrlPageForHost' />

          <UrlPageForHost
            linkForPlayers={linkForPlayers}
            handleRegistration={handleRegistration}
          />
        </div>
      </Router>
    );
  }
  if (
    showPlayerPage === true &&
    confirmGame === true &&
    waitingLounge === false
  ) {
    return (
      <Router>
        <div>
          <Redirect from='/UrlPageForHost' to='/ConfirmGame' />
          <Route exact path='/ConfirmGame'>
            <ConfirmGame
              gameParticipation={handleGameParticipation}
              playerAmount={playerAmount}
              newPlayer={newPlayer}
              handlePlayerNameChange={handlePlayerNameChange}
            />
          </Route>
        </div>
      </Router>
    );
  }
  if (
    showPlayerPage === true &&
    confirmGame === true &&
    waitingLounge === true
  ) {
    return (
      <Router>
        <div>
          <Redirect from='/ConfirmGame' to='/WaitingGame' />
          <WaitingGame
            playerAmount={playerAmount}
            newPlayer={newPlayer}
            readyPlayers={readyPlayers}
            waitingNumber={waitingNumber}
            handlewaitingNumber={handlewaitingNumber}
          />
        </div>
      </Router>
    );
  }
  return <div></div>;
};

export default FileGatheringBox;
