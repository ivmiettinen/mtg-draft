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



//Variable for storing player amount:

const playerAmountVar = [];

//Route for storing player amount

mtgRouter.post('/playerAmount', (req, res) => {
  const playerAmount = req.body;

  if(!playerAmount.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  if(playerAmountVar.length >= 1){
    console.log('ERROR: players amount already declared')

    return res.status(400).json({
      error: 'players amount already declared'
    })
  }

 console.log('TYPEE', typeof playerAmount)

 playerAmountVar.push(playerAmount)



 //Max number from object array:
 console.log('Max number', Math.max.apply(Math, playerAmountVar.map((param) => {
  return param.content
})))

res.send(linkToInvite)
 
})

//Loop for giving all the participating players
//random uuid:

const linkToInvite = 'www.ilkka.com/LinkToMtgParticipate'


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
