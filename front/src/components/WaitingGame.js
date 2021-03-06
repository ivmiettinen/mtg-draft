import React from 'react';

export const WaitingGame = ({
  showPlayerPage,
  confirmGame,
  waitingLounge,
  newPlayer,
  playerAmount,
  readyPlayers,
  handlewaitingNumber,
  waitingNumber,
}) => {
  // console.log('handlewaitingNumber', handlewaitingNumber)

  // console.log('readyPlayers:', readyPlayers)

  if (
    showPlayerPage === true &&
    confirmGame === true &&
    waitingLounge === true
  ) {
    return (
      <div>
        <h3 className='waitingGame-title'>Player name: </h3>
        <h4 className='waitingGame-player'>{newPlayer}</h4>

        <p>
          You are waiting for other players.. then the draft is ready to start!
        </p>
        <p>
          Players ready: {readyPlayers.length} / {playerAmount}
        </p>
        <p>Time:</p>
        {/* <button onClick={handlewaitingNumber}>Klikkaa</button> */}
        <p>{waitingNumber}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default WaitingGame;
