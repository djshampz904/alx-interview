#!/usr/bin/node
// Star wars api
const request = require('request');
const url = 'https://swapi-api.hbtn.io/api/films/' + process.argv[2];

request(url, async function (error, response, body) {
    if (error) {
        console.error('error:', error);
    } else {
        const film = JSON.parse(body);
        for (const characterUrl of film.characters) {
            const character = await new Promise((resolve, reject) => {
                request(characterUrl, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.parse(body));
                    }
                });
            });
            console.log(character.name);
        }
    }
});