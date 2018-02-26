const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('../database/data.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('../client/public'));

app.get('/attractions', (req, res) => {
  database.getAll((err, data) => {
    if (err) {
      console.log('error from get request /attractions')
      res.status(404).json({ message: 'No attractions' });
    }
    res.json(data);
  });
});

app.get('/attractions/:id', (req, res) => {
  const requestId = Number(req.params.id);

  database.getById(requestId, (err, data) => {
    if (err) {
      res.status(404).json({ message: 'No attraction' });
    }
    res.json(data);
  });
});

app.listen(port, () => console.log('listening on port 3000'));
