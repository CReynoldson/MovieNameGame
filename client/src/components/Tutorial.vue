<template>
  <div class="card">
    <header> {{ title }} </header>
    <p> {{ content }} </p>
    <h1> Methodssss </h1>
    <h2> {{nef}} </h2>
    <h3> {{ quote }} </h3>
    <h4> {{ curious }} </h4>
  </div>
</template>

<script>
  export default {
    name: 'card',
    data () {
      return {
          quote: "",
          curious: "",
          nef: "",
          title: "Dinosaurs",
          content: "Dinosaurs are majestic creatures trapped in tar, sea beds, and other natural phenomena sent by God to destroy them during the height of their power"
        }
      },
    mounted () {
      this.nineteenEightyFour(),
      this.harryPotter(),
      this.aliceInWonderland()
    },
    methods: {
      nineteenEightyFour () {
        this.nef = `2 + 2 is ${ 2 + 3 }`
      },
      harryPotter () {
        this.quote = "Yer A Wizard Harry"
      },
      aliceInWonderland () {
        this.curious = "Curiouser and curiouser".split().reverse().join()
      }
    }
  }
</script>
