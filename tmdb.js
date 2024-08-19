const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/authentication';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTZjNDMyNTQ5NTc3ZmJmZjEwOGQyYzE3ZmIyNTA5OCIsIm5iZiI6MTcyMDQ3Mzg4NC4wNjkzNjUsInN1YiI6IjY2OGM1ODIyNzFhMWRkMzlhMzBiZmFlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5gzaV8irVJhWLtRfmXnNIHZRDAFJQhboDcj2OcxW67o'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
