const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoDatabase = require('../Mongodatabase/data.js');
const sqlDatabase = require('../SQLdatabase/data.js');
const nr = require('newrelic');

const app = express();
const port = 3004;

app.use('/listings/:id/q-and-a', express.static(`${__dirname}/../client/public`));
app.use('/listings/:id/', express.static(`${__dirname}/../client/public`));
app.use(express.static(`${__dirname}/../client/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT;
const client = redis.createClient(REDIS_PORT);

function cache(req, res, next) {
  const id = req.params.id
  client.get(id, function (err, data) {
      if (err) throw err;

      if (data != null) {
          res.send(JSON.parse(data));
      } else {
          next();
      }
  });
}

function getData(req, res, next) {
  const requestId= req.params.id
  mongoDatabase.getById(requestId, (err, data) => {
    if (err) {
      res.status(404).json({ message: 'No attraction' });
    }
    console.log(data[0].questions)
    client.setex(requestId, 3600, JSON.stringify(data[0].questions));
    
    res.json(data[0].questions);
  });
};

app.get('/api/listings/:id/q-and-a', cache, getData);





// app.get('/api/listings/:id/q-and-a', (req, res) => {
//   const requestId = Number(req.params.id);
//   // console.time()
//   sqlDatabase.getById(requestId, (err, data) => {
//     if (err) {
//       res.status(404).json({ message: 'No attraction' });
//     }
//     // console.timeEnd()
//     res.json(data);
//   });
// });



app.listen(port, () => console.log(`listening on port ${port}`));
