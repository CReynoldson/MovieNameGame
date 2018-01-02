const request = require("request")
const rp = require("request-promise")
const fetch = require("node-fetch")

const envVars = require("../config.json")
const TMDBAuth = envVars["TMDB"]


function buildOptions(uri, queryString) {
  let options = {
      uri: uri,
      qs: {
        api_key: TMDBAuth,
        query: queryString
      },
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
  };
  return options
}


function buildSearchURL(type, name) {
  return `https://api.themoviedb.org/3/search/${type}?api_key=${TMDBAuth}&query=${name}`
}

function searchForMovie(movieName) {
  return new Promise((resolve, reject) => {
  let searchURL = buildSearchURL('movie', movieName)
  let options = buildOptions(searchURL, movieName)
  let movieID = rp(options)
    .then(function (movieList) {
        resolve(movieList['results'].length > 0 ? movieList['results'][0]['id'] : "Movie could not be located")
    })
    .catch(function (err) {
      throw (err)
      reject("query didn't work")
    })
  })
}

function searchForActor(actorName) {
  return new Promise((resolve, reject) => {
    let searchURL = buildSearchURL("person", actorName)
    let options = buildOptions(searchURL, actorName)
    let actorID = rp(options)
      .then((actorList) => {
        resolve(actorList['results'].length > 0 ? actorList['results'][0] : "Could not find actor")
      })
      .catch((err) => {
        throw (err)
        reject("couldn't find the actor you were looking for")
      })
  })
}

function getMovieCastList(movieID) {
  return new Promise((resolve, reject) => {
    let movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${TMDBAuth}`
    let options = buildOptions(movieDetailsURL, "")
    let cast = rp(options)
      .then((credits) => {
        resolve(credits['cast'])
      })
      .catch((err) => {
        console.log(err)
        reject("Couldn't get the cast list")
      })
  })
}

function actorIsInCastList(actorID, movieID) {
  return new Promise((resolve, reject) => {
    let castList = getMovieCastList(movieID)
      .then((castList) => {
        let castIDs = castList.map(actor => actor['id'])
        resolve(castIDs.includes(actorID))
      })
      .catch((err) => {
        console.log(err)
        reject("Couldn't check the cast list properly oh dear")
      })
  })
}

module.exports = {searchForMovie, searchForActor, actorIsInCastList}

