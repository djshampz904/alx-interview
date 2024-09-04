#!/usr/bin/node

const request = require('request');
const API_URL = 'https://swapi-api.alx-tools.com/api';

// Ensure the correct number of arguments
if (process.argv.length !== 3) {
  console.error('Usage: ./0-starwars_characters.js <Movie ID>');
  process.exit(1);
}

const movieId = process.argv[2];

// Helper function to fetch a character's name
function fetchCharacter(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode !== 200) {
        reject(new Error(`HTTP error! status: ${response.statusCode}`));
      } else {
        resolve(JSON.parse(body).name);
      }
    });
  });
}

// Request the movie details
request(`${API_URL}/films/${movieId}/`, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('HTTP error! status:', response.statusCode);
    return;
  }

  const film = JSON.parse(body);
  const characterPromises = film.characters.map(fetchCharacter);

  // Fetch all characters and print them in the correct order
  Promise.all(characterPromises)
    .then(names => {
      names.forEach(name => console.log(name));
    })
    .catch(error => {
      console.error('Error fetching characters:', error);
    });
});
