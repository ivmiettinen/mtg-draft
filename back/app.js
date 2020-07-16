const express = require("express");
const app = express();

app.use(express.json());

const config = require("./utils/config");

const cors = require('cors')

app.use(cors())


// const mtgRouter = require('./controllers/gameControllers')

const http = require("http");

const { uuid } = require("uuidv4");

// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end('Hello World')
//   })
//

let mtgCards = [
  {
    id: 1,
    content: "black lotus",
    date: "2020-01-10T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "serra",
    date: "2020-01-10T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "teferi forever",
    date: "2020-01-10T19:20:14.298Z",
    important: true,
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

  console.log('')

  const playerAmount = [
    {
      players: newParticipant.content,
      id: uuid(),
    },
  ];

  console.log("playerAmount", typeof playerAmount[0].players);





  //

    //For loop - turn total amount of players into
    //number sequence with unique ID's

    let allPlayers = []

    if(playerAmount[0].players){

        playerAmount[0].players += 1

    

    for (let i = 1; i < playerAmount[0].players; i++ ){
        let obj = {}

        obj['PlayerNum:'] = i

        obj['id'] = uuid()
        
        
        allPlayers.push(obj)


        console.log('AllPlayersInForLoop:', allPlayers)
    }
    
      //
      console.log('AllPlayers after for loop:', allPlayers)

    
}


addedCard = mtgCards.concat(playerAmount);

res.json(addedCard);

// const arr = ['a','b','c'];
// const asdasd = arr.reduce((array,key)=> (array[key]=uuid(),array),{});
// console.log('Jonomme:', asdasd)
// console.log('Jonomme2:', asdasd[0])


  //New mapping:

    // function setIDs (item, index) {
    //     let playerID = uuid() + item;
    //     return playerID
    // }

    // const mapPlayers = allPlayers.map(setIDs)

    // console.log('MAPPII', mapPlayers)

    // const setIDs = (item, index) => {let PlayerID = uuid + item  };



    //Total amount of players... delete?:

//   let mappaus = playerAmount.map((param) => {
//     console.log("param.players", param.players);
//     return param.players;
//   });

//   console.log("mappaus", mappaus);

  //


  //
 
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
