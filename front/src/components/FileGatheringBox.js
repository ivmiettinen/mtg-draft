import React, { useState, useEffect } from 'react';
import PlayerCards from './PlayerCards'

export const FileGatheringBox = () => {

    const [playerAmount, setPlayerAmount] = useState(['']);


    const handlePlayerAmount = e => {
        console.log('click:', e.target.value)
        setPlayerAmount(e.target.value)
        }


    return (
        <div>
            <PlayerCards  handleClick={handlePlayerAmount} />
        </div>
    )
}

export default FileGatheringBox;