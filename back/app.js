const express = require("express");
const app = express();

app.use(express.json());

const config = require("./utils/config");

const cors = require("cors");

app.use(cors());

// const mtgRouter = require('./controllers/gameControllers')

const http = require("http");

const { uuid } = require("uuidv4");

// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end('Hello World')
//   })

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

app.get("/", (req, res) => {
  res.send("<h1>Hello world! </h1>");
});

app.get("/api/mtg", (req, res, next) => {
  res.send(mtgCards);
});

app.post("/api/mtg", (req, res) => {
  const newParticipant = req.body;
  console.log("newParticipant", newParticipant);

  if (!newParticipant.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  console.log("");

  const playerAmount = [
    {
      players: newParticipant.content,
      id: uuid(),
    },
  ];

  console.log("playerAmount", typeof playerAmount[0].players);



  //For loop - turn total amount of players into
  //number sequence with unique ID's

  let allPlayers = [];

  if (playerAmount[0].players) {
    playerAmount[0].players += 1;

    for (let i = 1; i < playerAmount[0].players; i++) {
      let obj = {};

      obj["PlayerNum:"] = i;

      obj["id"] = uuid();

      allPlayers.push(obj);

      console.log("AllPlayersInForLoop:", allPlayers);
    }

    //
    console.log("AllPlayers after for loop:", allPlayers);
  }

  addedCard = mtgCards.concat(playerAmount);

  res.json(addedCard);

 
});

// const newParticipant = req.body
//     console.log('newParticipant', newParticipant)
//     res.json(newParticipant).then(item => {

//     res.send('item saved to backend')}).catch(err => {
//         res.status(400).send('unable to save')
//     })

// app.use('api/cards', mtgRouter)

app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`);
});
