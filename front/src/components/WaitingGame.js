import React from 'react'

export const WaitingGame = ({newPlayer, playerAmount, readyPlayers, handlewaitingNumber, waitingNumber}) => {
    
    
    console.log('Propsit ReadyPlayers', handlewaitingNumber)
    


    return (
        <div>
            <h3 className='waitingGame-title'>Player name: </h3>
        <h4 className='waitingGame-player'>{newPlayer}</h4>
        
        <p>You are waiting for other players.. then the draft is ready to start!</p>
        <p>Players ready: {readyPlayers.length } / {playerAmount}</p>
        <p>Time:</p>
        {/* <button onClick={handlewaitingNumber}>Klikkaa</button> */}
        <p>{waitingNumber}</p>
        </div>
    )
}

export default WaitingGame
