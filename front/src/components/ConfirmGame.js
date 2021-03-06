import React from 'react';

export const ConfirmGame = ({
  showPlayerPage,
  confirmGame,
  gameParticipation,
  waitingLounge,
  handlePlayerNameChange,
  playerAmount,
  newPlayer,
}) => {
  // console.log('props', gameParticipation)

  if (
    showPlayerPage === true &&
    confirmGame === true &&
    waitingLounge === false
  ){

  return (
    <div>
      <h2 className='confirmGame-participate'>
        Are you ready to participate into {} MTG draft with {playerAmount}{' '}
        players?
      </h2>
      <form onSubmit={gameParticipation}>
        <h4 className='confirmGame-playerName'>
          Write your player name below and press 'confirm'
        </h4>
        <input
          minLength='3'
          maxLength='25'
          value={newPlayer}
          onChange={handlePlayerNameChange}
        ></input>
        <button>Confirm draft</button>
      </form>
    </div>
  )}
  else{
    return(<div>

    </div>)
  }
};

export default ConfirmGame;
