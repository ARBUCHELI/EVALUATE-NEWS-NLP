const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const API_KEY = process.env.API_KEY;
console.log(`API key: ${API_KEY}`)

//display of UI
app.get('/', function (req, res) {
  res.status(200).sendFile(path.resolve('dist/index.html'));
});

//POST request
app.post('/test', async (req, res) => {
  urlEntry = req.body.url;
  const response = await fetch(`${baseUrl}${API_KEY}&of=json&txt&model=general&lang=en&url=${req.body.url}`);
  console.log('server response: ', response);
  const data = await response.json();
  console.log('server side: ', data);
  const projectData = {
     score_tag: data.score_tag,
     confidence: data.confidence,
     irony: data.irony,
     subjectivity: data.subjectivity,
   };
   res.send(projectData);
   console.log(projectData);
  });

module.exports = app;