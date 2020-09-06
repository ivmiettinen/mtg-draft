const mtgRouter = require('express').Router();

const { uuid } = require('uuidv4');

const allPlayerStorage = require('../allPlayerStorageDB');
// console.log('allPlayerStorage', allPlayerStorage)

//Variable for storing all the registered players

//

mtgRouter.get('/', (req, res) => {
  console.log('GET:', allPlayerStorage);

  // console.log('GET LENGTH:', allPlayerStorage.length);

  res.json(allPlayerStorage.map((player) => player));
});

//Variable for storing player amount number:

const playerAmountNumber = [];

//

//Route for storing player amount

mtgRouter.post('/playerAmount', (req, res) => {
  const playerAmount = req.body;

  console.log('playerAmount:', playerAmount);

  if (!playerAmount.content) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  // You can post only once the player amount:

  // if (playerAmountNumber.length >= 1) {
  //   console.log("ERROR: players amount already declared");

  //   return res.status(400).json({
  //     error: "players amount already declared",
  //   });
  // }

  // console.log("TYPEE", typeof playerAmount);

  playerAmountNumber.push(playerAmount);

  console.log('playerAmountNumber:', playerAmountNumber);

  //Max number from object array:
  console.log(
    'Max number',
    Math.max.apply(
      Math,
      playerAmountNumber.map((param) => {
        return param.content;
      })
    )
  );

  res.send(linkToInvite);
});

const linkToInvite = 'www.ilkka.com/LinkToMtgParticipate';

mtgRouter.post('/playerRegister', (req, res) => {
  const newParticipant = req.body;

  const mapAllPlayers = playerAmountNumber.map((param) => param.content);

  const maxPlayers = Math.max(mapAllPlayers);

  console.log('maximi:', maxPlayers);

  console.log('AllPlayersStorage:', allPlayerStorage);

  console.log('AllPlayersStoragen length', allPlayerStorage.length);

  // console.log(
  //   'aiemmin pushatut pelaajat eli playerAmountNumber',
  //   playerAmountNumber
  // );

  if (allPlayerStorage.length === maxPlayers) {
    console.log('All the player seats are taken');

    res.send('All the player seats are taken');

    return;
  }

  let allPlayerNames = allPlayerStorage.map((param) => {
    return param.player;
  });

  if (allPlayerNames.includes(newParticipant.content)) {
    return res.status(409).json({
      error: 'playername is already in use!',
    });
  }

  //
  // const samePlayerName = allPlayerStorage.find()

  //   const apuFunktio = newParticipant.content

  //   const etsinta = apuFunktio.find((apuFunktio) => {
  //     return param
  //   })

  // console.log('findi', etsinta)

  // if(newParticipant.content === ){

  // }

  //

  if (!newParticipant.content) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  // console.log('Max number', Math.max.apply(Math, playerAmountNumber.map((param) => {
  //   return param.content
  // })))
  else {
    const playerAmount = {
      player: newParticipant.content,
      id: uuid(),
    };

    allPlayerStorage.push(playerAmount);
    console.log('deallPlayerStoragedeebee', allPlayerStorage);
    console.log('allPlayerStorage.length', allPlayerStorage.length);

    // console.log("allPlayerStorage:", allPlayerStorage);
  }
  // console.log('Tähän mennessä pelaajia on', )

  // const numberToSend = allPlayerStorage.length

  res.send('posting was succesful');
});

(module.exports = mtgRouter), ['foo', 'bar', 3];
