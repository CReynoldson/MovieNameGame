const request = require("request")
const rp = require("request-promise")
const fetch = require("node-fetch")

const envVars = require("../config.json")
const TMDBAuth = envVars["TMDB"]

function TMDB() {
  this.auth = TMDBAuth
  // this.baseMovieSearchURL = `https://api.themoviedb.org/3/search/movie?api_key=${this.auth}&query=${}`
  // this.basePersonSearchURL = `https://api.themoviedb.org/3/search/person?api_key=${this.auth}&query=${personName}`
  // this.baseMovieDetailsURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.auth}`
  // this.baseMovieCastListURL = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${this.auth}`
  // this.basePersonDetailsURL = `https://api.themoviedb.org/3/person/${personID}?api_key=${this.auth}`
}

TMDB.prototype.buildOptions = function (uri, queryString) {
  let options = {
      uri: uri,
      qs: {
        api_key: this.auth,
        query: queryString
      },
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
  };
  return options
}


TMDB.prototype.buildMovieSearchURL = function (movieName) {
  return `https://api.themoviedb.org/3/search/movie?api_key=${this.auth}&query=${movieName}`
}

TMDB.prototype.searchForMovie = (movieName, ) => new Promise((resolve, reject) => {
  console.log('GOT TO SEARCHING FOR MOVIE IN FIRST CALLBACK')
  let searchURL = TMDB.buildMovieSearchURL(movieName)
  let options = TMDB.buildOptions(searchURL, movieName)
  let movieID = rp(options)
    .then(function (movieList) {
        console.log('RESULTS', movieList[0]['id']);
        return movieList['results'].length > 0 ? movieList['results'][0]['id'] : "Movie could not be located"
    })
    .catch(function (err) {
      console.log('ERROR', err)
      throw (err)
    });
  })

TMDB.prototype.searchForActor = function (name) {

}

// TMDB.prototype.getMovieCastList = function (movieID) {
  // request.get(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${this.auth}`, function (err, response, body) {

//   })
// }

TMDB.prototype.actorIsInCastList = function (actorID, castList) {

}

module.exports = new TMDB()