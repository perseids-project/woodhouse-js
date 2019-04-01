const woodhouse = require('../vendor/woodhouse.json');
const fs = require('fs');

let dictionary = {};
let exact = {};
let greek = {};
let latin = {};
let inOrder = [];
let inOrderExists = {};

Object.entries(woodhouse).forEach(([key, val]) => {
  dictionary[key] = val.d;

  val.m.forEach((word) => {
    exact[word] = exact[word] || [];

    exact[word].push(key);

    if (!inOrderExists[word]) {
      inOrderExists[word] = true;

      inOrder.push(word);
    }
  });
});

fs.writeFileSync('./src/dictionaries/dictionary.json', JSON.stringify(dictionary)); 
fs.writeFileSync('./src/dictionaries/exact-match.json', JSON.stringify(exact)); 
fs.writeFileSync('./src/dictionaries/greek-match.json', JSON.stringify(greek)); 
fs.writeFileSync('./src/dictionaries/latin-match.json', JSON.stringify(latin)); 
fs.writeFileSync('./src/dictionaries/in-order.json', JSON.stringify(inOrder.sort()));
