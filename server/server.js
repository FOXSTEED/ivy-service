
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const attractions = require('../fakeData');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('../client/public'))


app.get('/attractions', (req, res) => {
    if (!attractions) {
        res.status(404).json({ message: 'no data here' });
    }
    res.json(attractions);
});

app.get('/attractions/:id', (req, res) => {
    const requestId = Number(req.params.id);

    const matchingAttraction = attractions.filter((attraction) => {
        return requestId === attraction.id;
    });

    res.json(matchingAttraction);
})

app.listen(port, () => { console.log('listening on port 3000'); });
