import React, { useState, useEffect } from 'react';
import PlayerCards from './PlayerCards';
import cardServiceClient from './services/cardServiceClient';
import WaitingForGame from './WaitingForGame';

export const FileGatheringBox = () => {
  const [playerAmount, setPlayerAmount] = useState('');
  const [numberToServer, setnumberToServer] = useState([]);
  const [showPlayerPage, setshowPlayerPage] = useState(false);
  const [newPlayer, addNewPlayer] = useState([])

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
   console.log('value:', e.target.value)
   addNewPlayer(e.target.value)
  }

  const handlePlayerAmount = (e) => {
    e.preventDefault();

    const playerObject = {
      content: Number(playerAmount),
    };

    console.log('personObject', playerAmount);

    cardServiceClient.create(playerObject).catch((error) => {
      console.log('There was on error on posting:', error);
    });

    setshowPlayerPage(!false)
  };


  const handleGameParticipation = (e) => {



    e.preventDefault();

    // console.log('handleGameParticipation', e)

 

    const confirmObject = {
      content: newPlayer,
      id: 1
    }

    cardServiceClient.create(confirmObject).catch((error) => {
      console.log('there was an error confirming your participation', error)
    })

    addNewPlayer('')

  }


  console.log('showPlayerPage', showPlayerPage);

  if (showPlayerPage === false) {
    return (
      <div>
        <PlayerCards
          handleClick={handlePlayerAmount}
          handleNumberChange={handleNumberChange}
        />
      </div>
    );
  } else if (showPlayerPage === true) {
    return (
      <div>
        <WaitingForGame gameParticipation={handleGameParticipation} playerAmount={playerAmount} newPlayer={newPlayer} handlePlayerNameChange={handlePlayerNameChange}/>
      </div>
    );
  } else {
    return <div>Something went wrong</div>;
  }
};

export default FileGatheringBox;
