const woodhouse = require('../vendor/woodhouse.json');
const fs = require('fs');

let dictionary = {};
let exact = {};
let greek = {};
let latin = {};

Object.entries(woodhouse).forEach(([key, val]) => {
  dictionary[key] = val.d;

  val.m.forEach((word) => {
    exact[word] = exact[word] || [];

    exact[word].push(key);
  });
});

fs.writeFileSync('./src/dictionaries/dictionary.json', JSON.stringify(dictionary)); 
fs.writeFileSync('./src/dictionaries/exact-match.json', JSON.stringify(exact)); 
fs.writeFileSync('./src/dictionaries/greek-match.json', JSON.stringify(greek)); 
fs.writeFileSync('./src/dictionaries/latin-match.json', JSON.stringify(latin)); 
