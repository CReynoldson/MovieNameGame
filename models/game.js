const {searchForMovie, searchForActor, actorIsInCastList} = require("../api/tmdb.js")
const Player = require("./player.js")

function Game (data) {
    this.playerOne = new Player(data['playerOne'])
    this.playerTwo = new Player(data['playerTwo'])
    this.name = `${this.playerOne.name} vs ${this.playerTwo.name}`
    this.difficulty = "normal"
    this.totalScore = 0
    this.moviesPlayed = []
    this.actorsPlayed = []
    this.round = 1
  }

  Game.prototype.toString = function () {
    return `${this.name} - Score = ${this.playerOne.playerScore} : ${this.playerTwo.playerScore} `
  }

  Game.prototype.getCurrentPlayer = function () {
    return this.round %2 === 1 ? this.playerOne : this.playerTwo
  }

  Game.prototype.checkIfRepeatAnswers = function (movieName, actorName) {
    let movieRepeat = this.moviesPlayed.includes(movieName.trim().toLowerCase())
    let actorRepeat = this.actorsPlayed.includes(actorName.trim().toLowerCase())

    let results = {}

    if (movieRepeat && actorRepeat) {
      results['message'] = "Both of these have been guessed already!"
    } else if (movieRepeat) {
      results['message'] = "Someone guessed this movie already!"
    } else if (actorRepeat) {
      results['message'] = "Someone guessed this actor already!"
    }

    if (results['message']) {
      results['status'] = "failure"
    } else {
      results ['status'] = "success"
    }
    return results
  }

  Game.prototype.playRound = function (data, game, cb) {
    movieName = data["movie"]
    actorName = data["actor"]
    validAnswers = game.checkIfRepeatAnswers(movieName, actorName)
    if (validAnswers['status'] === "failure") {
      cb(validAnswers['message'])
    } else {
      let movieID = searchForMovie(movieName)
      .then((movieID) => {
        let actorID = searchForActor(actorName)
        .then((actorID) => {
          let answer = actorIsInCastList(actorID['id'], movieID)
          .then((isCorrect) => {
            if (isCorrect) {
              game.handleCorrectAnswer(movieName, actorName)
              cb("success")
            } else {
              cb("failure")
            }
          })
        })
      })
    }

  Game.prototype.handleCorrectAnswer = function (movie, actor) {
    this.totalScore++
    this.round++
    this.moviesPlayed.push(movie.trim().toLowerCase())
    this.actorsPlayed.push(actor.trim().toLowerCase())
    this.getCurrentPlayer().incrementScore()
  }
}

module.exports = Game