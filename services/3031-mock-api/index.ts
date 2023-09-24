// @ts-nocheck

import IPFS from '@infura/sdk/dist/src/services/ipfsService';
const cors = require('cors');

const PORT: number = +(process.env.PORT || 3031);
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = PORT;

const pinningClient = new IPFS({
  // @ts-ignore
  projectId: process.env.INFURA_KEY,
  // @ts-ignore
  apiKeySecret: process.env.INFURA_SECRET_KEY,
});

let counter = 0;

// Endpoint to get the counter value
app.get('/counter', (req, res) => {
  res.json({ counter });
});

// Endpoint to increase the counter
app.get('/counter/add', (req, res) => {
  counter += 1;
  res.json({ counter });
});

// Endpoint to decrease the counter
app.get('/counter/minus', (req, res) => {
  counter -= 1;
  res.json({ counter });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.post('/upload', async (req, res) => {

  console.log('uploading:', req.body);

  const data = req.body.data;

  try {
    const uploadRes = await pinningClient.uploadContent({ source: data });
    res.json({ uploadRes: uploadRes.split('//')[1] });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading data' });
  }

});