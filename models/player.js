function Player (playerData) {
    this.name = playerData
    this.playerScore = 0
  }

  Player.prototype.incrementScore = function () {
    this.playerScore++
  }

  Player.prototype.toString = function () {
    return `${this.name}`
  }

module.exports = Player