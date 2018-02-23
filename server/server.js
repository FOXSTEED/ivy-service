
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const dumbData = require('../dumbData');
const data = require('../fakeData')

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(express.static('../client/public'))


app.get('/listing', (req, res) => {
    if (!data.fakeData){
        res.status(404).json({message: 'no data here'})
    }
    res.json(data.fakeData);
});

app.get('/listing/:id', (req, res) => {
    const requestId = req.params.id;

    let item = data.fakeData.filter((questions) => {
        return requestId == questions.id;
    })

    res.json(item);
})

app.listen(port, () => console.log('Example app listening on port 3000!')); 


