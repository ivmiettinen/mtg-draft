const express = require("express");
const app = express();

app.use(express.json());

// serve files from the public directory


const cors = require("cors");

app.use(cors());

const mtgRouter = require('./controllers/gameControllers')





// const newParticipant = req.body
//     console.log('newParticipant', newParticipant)
//     res.json(newParticipant).then(item => {

//     res.send('item saved to backend')}).catch(err => {
//         res.status(400).send('unable to save')
//     })

app.use('/api/mtg', mtgRouter)



module.exports = app