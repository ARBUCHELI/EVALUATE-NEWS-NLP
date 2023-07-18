const dotenv = require('dotenv');
dotenv.config();



var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/api', async function (req, res) {
    const apiKey = process.env.API_KEY;
    const url = req.body.url;
    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&of=json&url=${url}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.send(data);
    } catch (error) {
      console.log('Error:', error);
      res.status(500).send('An error occurred');
    }
  });

  //New code
  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: `key=${process.env.API_KEY}&url=${encodeURIComponent(data.url)}`,
    });
  
    try {
      return await response.json();
    } catch (error) {
      console.log('Error:', error);
      return { error: 'Failed to fetch data from the API' };
    }
  }
  
  app.post('/api', async function (req, res) {
    const data = req.body;
    const apiUrl = 'https://api.meaningcloud.com/sentiment-2.1';
  
    try {
      const apiResponse = await postData(apiUrl, data);
      res.send(apiResponse);
    } catch (error) {
      console.log('Error:', error);
      res.status(500).send({ error: 'An error occurred' });
    }
  });