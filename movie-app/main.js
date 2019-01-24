document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault()
  let searchText = document.getElementById('search-text').value
  console.log(searchText)
  getMovies(searchText)
})

function getMovies(searchText) {
  fetch('http://www.omdbapi.com/?apikey=18fcdb70&s=' + searchText)
    .then(res => res.json())
    .then(data => {
      console.log(data)

      let movies = data.Search
      let output = ""

      movies.forEach((movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `
        document.getElementById('movies').innerHTML = output
      })
    })
    .catch(err => console.log(err))
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id)
  window.location = "movie.html"
  return false
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId')

  fetch('http://www.omdbapi.com/?apikey=18fcdb70&i=' + movieId)
    .then(res => res.json())
    .then(data => {

      let movie = data
      console.log(movie)

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            <p>${movie.Plot}</p>
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-primary">Back to Search ></a>
          </div>
        </div>
      `

      document.getElementById('movie').innerHTML = output
    })
    .catch(err => console.log(err))
}
