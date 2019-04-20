const app = new Vue({
  el: '#app',
  data: {
    searchText: '',
    movies: [],
    movieSelected: {},
    showMovieSelected: false,
    url: ''
  },
  methods: {
    getMovies: function() {
      fetch('http://www.omdbapi.com/?apikey=18fcdb70&s=' + this.searchText)
        .then(res => res.json())
        .then(data => {

          this.movies = data.Search
          console.log(this.movies)
        })
        .catch(err => console.log(err))
    },
    selectMovie: function(id) {
      fetch('http://www.omdbapi.com/?apikey=18fcdb70&i=' + id)
        .then(res => res.json())
        .then(data => {

          this.movieSelected = data
          this.url = 'http://www.imdb.com/title/' + this.movieSelected.imdbID
          console.log(this.movieSelected.imdbID)

        })
        .catch(err => console.log(err))

        this.showMovieSelected = true
    },
  },
  computed: {},
}).$mount('#app')
