
import React from 'react'

// import {Card, Button} from 'react-bootstrap'






export const PlayerCards = ({handleClick}) => {

   

    return (
        <div>
            <h2 className='topicToSetPlayers'>Magic the gathering</h2>
            <div>
               <h3 style={{color: 'lightblue'}}>How many players you want to draft with?</h3>
                <button className='buttonToSetPlayers' value={2} onClick={handleClick}>2 players </button>
                <button className='buttonToSetPlayers' value={3} onClick={handleClick}>3 players </button>
                <button className='buttonToSetPlayers' value={4} onClick={handleClick}>4 players </button>
                <button className='buttonToSetPlayers' value={5} onClick={handleClick}>5 players </button>
                <button className='buttonToSetPlayers' value={6} onClick={handleClick}>6 players </button>
            
            </div>


        </div>
    )
}


export default PlayerCards;