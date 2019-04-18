const app = new Vue({
  el: '#app',
  data: {
    date: '',
    asteroidArray: [],
    showTable: false,
  },
  methods: {
    findAsteroids: function() {
      fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.date}&end_date=${this.date}&api_key=oVYuYjmTXpNRtt3f4oXMdm8EJGoybo73QLxLycCE`)
        .then(res => res.json())
        .then(data => {

          this.asteroidArray = data["near_earth_objects"][this.date]

          console.log(this.asteroidArray)
          this.showTable = true

        })
        .catch(err => console.log(err))
    },
  },
  computed: {},
}).$mount('#app')
