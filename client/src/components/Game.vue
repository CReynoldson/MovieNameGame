<template>
  <div class="game">
    <div class="player-card">
      <h1> {{ title }} </h1>
      <h2> {{ playerName }} : {{ playerScore }} </h2>
    </div>
    <form>

    </form>
      <label>
        Movie:
        <input type="text" v-model="movie">
      </label>
      <label>
        Actor:
        <input type="text" v-model="actor">
      </label>
      <button v-on:click="playMovie(movie, actor)"> Play! </button>
  </div>
</template>

<script>
  import GameService from '@/services/GameService'
  export default {
    name: 'game',
    data () {
      return {
        title: "Movie Name Game!",
        playerName: "Corky",
        playerScore: "1000",
        movie: "",
        actor: "",
      }
    },
    methods: {
      async playMovie(movie, actor) {
        const response = await GameService.playMovie(movie, actor)
        console.log(response)
        this.round = response.data
      }
    }
  }
</script>
