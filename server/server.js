const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoDatabase = require('../Mongodatabase/data.js');
const sqlDatabase = require('../SQLdatabase/data.js');

const app = express();
const port = 3004;

app.use('/listings/:id/q-and-a', express.static(`${__dirname}/../client/public`));
app.use('/listings/:id/', express.static(`${__dirname}/../client/public`));
app.use(express.static(`${__dirname}/../client/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get('/api/listings/:id/q-and-a', (req, res) => {
  const requestId = Number(req.params.id);
  mongoDatabase.getById(requestId, (err, data) => {
    if (err) {
      res.status(404).json({ message: 'No attraction' });
    }
    // console.log(data)
    res.json(data[0].questions);
  });
});


// app.get('/api/listings/:id/q-and-a', (req, res) => {
//   const requestId = Number(req.params.id);
//   sqlDatabase.getById(requestId, (err, data) => {
//     if (err) {
//       res.status(404).json({ message: 'No attraction' });
//     }
//     // console.log(data)
//     res.json(data);
//   });
// });



app.listen(port, () => console.log(`listening on port ${port}`));
