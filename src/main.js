import Vue from 'vue';

let app = new Vue({
  el: '#app',
  data: {
    message: "NO WAYYYYYyyYYYY"
  }
})

let app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString()
  }
})