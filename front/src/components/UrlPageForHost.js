import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Routing from './Routing'

export const UrlPageForHost = ({
  showPlayerPage,
  confirmGame,
  linkForPlayers,
  handleRegistration,
}) => {
  // console.log('UrlPageForHost', window.location.href)

  if (showPlayerPage === true && confirmGame === false) {
    return (
      <div>
        <p className='urlPageForHost-paragraph1'>
          Share link below to other players:
        </p>

        <h3 className='urlPageForHost-paragraph2'>{linkForPlayers}</h3>
    
        <br />
        <br />
        <br />
        <br />
        <h4>After that press button:</h4>
        <button
          className='urlPageForHost-button'
          value={1}
          onClick={handleRegistration}
        >
          Let's start to draft
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default UrlPageForHost;
