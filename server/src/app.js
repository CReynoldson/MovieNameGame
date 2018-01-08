const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const morgan = require('morgan')
const envVars = require("../../config.json")
let Game = require("../../models/game.js")


const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

const PORT = envVars["PORT"] || 8080

let gamesInPlay = []

app.post("/start-game", (req, res) => {
  data = req.body
  data['playerOne'] = 'Corky'
  data['playerTwo'] = 'My arch nemesis'
  let currentGame = new Game(req.body)
  gamesInPlay.push({"gameId": 1, "game": currentGame})

  res.status(200).send(`Started a game - ${currentGame.toString()}`)
})

app.post("/play-turn", (req, res) => {
  data = req.body
  data['playerOne'] = 'Corky'
  data['playerTwo'] = 'My arch nemesis'

  let currentGame = new Game(req.body)
  gamesInPlay.push({"gameId": 1, "game": currentGame})

  let game = gamesInPlay[0]["game"]
  let currentPlayer = game.getCurrentPlayer()
  game.playRound(req.body, game, (results) => {
    if (results === "success") {
      message = `${currentPlayer} played ${req.body['actor']} in ${req.body['movie']} and got a point! Hurray for you.`
      console.log(game.totalScore, game.toString(), game.moviesPlayed, game.actorsPlayed)
    } else if (results === "failure") {
      message = "Incorrect movie / actor pairing"
    } else {
      message = results
    }
    res.status(200).send(`${message}`)
  })

})

app.listen(PORT, () => {
  console.log(`Movie Name Game is ecstatic to host you on port ${PORT}`)
})