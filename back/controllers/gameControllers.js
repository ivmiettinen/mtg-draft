const mtgRouter = require('express').Router();

const { uuid } = require('uuidv4');

//Temp cards:

let mtgCards = [
  {
    id: 1,
    content: 'black lotus',
  },
  {
    id: 2,
    content: 'serra',
  },
  {
    id: 3,
    content: 'teferi forever',
  },
];

//



mtgRouter.get('/', (req, res, next) => {
  res.send(mtgCards);
});


const linkToInvite = 'www.ilkka.com'


mtgRouter.post('/', (req, res) => {
  const newParticipant = req.body;
  // if(newParticipant === undefined){
  //   return res.status(400).json({error: 'content missing!!'})
  // }
  console.log('newParticipant', newParticipant);

  if (!newParticipant.content) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  console.log('');

  const playerAmount = [
    {
      players: newParticipant.content,
      id: uuid(),
    },
  ];

  console.log('playerAmount', typeof playerAmount[0].players);

  //For loop - turn total amount of players into
  //number sequence with unique ID's

  let allPlayers = [];

  if (playerAmount[0].players) {
    playerAmount[0].players += 1;

    for (let i = 1; i < playerAmount[0].players; i++) {
      let obj = {};

      obj['PlayerNum:'] = i;

      obj['id'] = uuid();

      allPlayers.push(obj);

      console.log('AllPlayersInForLoop:', allPlayers);
    }

    //
    console.log('AllPlayers after for loop:', allPlayers);
  }

  addedCard = mtgCards.concat(playerAmount);

  // res.json({'Here are all the cards at the server:': addedCard});

  res.send( linkToInvite)
});

module.exports = mtgRouter;
