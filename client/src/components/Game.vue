<template>
  <div class="game">
    <div class="player-card">
      <h1> {{ title }} </h1>
      <h2> {{ playerName }} : {{ playerScore }} </h2>
    </div>
    <div class="play-area">
      <label>
        Movie:
        <input type="text">
      </label>
      <label>
        Actor:
        <input type="text">
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'game',
    data () {
      return {
        title: "Movie Name Game!",
        playerName: "Corky",
        playerScore: "1000",
      }
    }
  }
</script>
