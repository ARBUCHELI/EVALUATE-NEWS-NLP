import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const API_KEY = process.env.API_KEY;
console.log(`API key: ${API_KEY}`);

// Display of UI
app.get('/', function (req, res) {
  res.status(200).sendFile(path.resolve('dist/index.html'));
});

// POST request
app.post('/test', async (req, res) => {
  const urlEntry = req.body.url;
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

export default app;
