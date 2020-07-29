const mtgRouter = require("express").Router();

const { uuid } = require("uuidv4");

//Temp cards:

let mtgCards = [
  {
    id: 1,
    content: "black lotus",
  },
  {
    id: 2,
    content: "serra",
  },
  {
    id: 3,
    content: "teferi forever",
  },
];

//

mtgRouter.get("/", (req, res, next) => {
  res.send(mtgCards);
});

//Variable for storing player amount number:

const playerAmountNumber = [];

//Route for storing player amount

mtgRouter.post("/playerAmount", (req, res) => {
  const playerAmount = req.body;

  console.log("miltä näyttää:", playerAmount);

  if (!playerAmount.content) {
    return res.status(400).json({
      error: "content missing",
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

  console.log("playerAmountNumber:", playerAmountNumber);

  //Max number from object array:
  console.log(
    "Max number",
    Math.max.apply(
      Math,
      playerAmountNumber.map((param) => {
        return param.content;
      })
    )
  );

  res.send(linkToInvite);
});

const linkToInvite = "www.ilkka.com/LinkToMtgParticipate";

//Variable for storing all the registered players

const allPlayerStorage = [];

mtgRouter.post("/playerRegister", (req, res) => {
  const newParticipant = req.body;

  const mapAllPlayers = playerAmountNumber.map((param) => param.content);

  const maxPlayers = Math.max(mapAllPlayers);

  console.log("AllPlayersStorage:", allPlayerStorage);

  console.log("AllPlayersStoragen length", allPlayerStorage.length);

  console.log(
    "aiemmin pushatut pelaajat eli playerAmountNumber",
    playerAmountNumber
  );

  if (allPlayerStorage.length === maxPlayers) {
    console.log("All the player seats are taken");

    res.send("All the player seats are taken");

    return;
  }

  if (!newParticipant.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  // console.log('Max number', Math.max.apply(Math, playerAmountNumber.map((param) => {
  //   return param.content
  // })))
  else {
    const playerAmount = 
      {
        player: newParticipant.content,
        id: uuid(),
      }
    

    allPlayerStorage.push(playerAmount);

    // console.log("allPlayerStorage:", allPlayerStorage);
  }
  res.send(linkToInvite);
});

module.exports = mtgRouter;
