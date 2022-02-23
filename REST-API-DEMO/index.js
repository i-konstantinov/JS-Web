const express = require("express");

const data = [
    {
        id: 101,
        name: 'first',
        color: "blue"
    },
    {
        id: 102,
        name: 'second',
        color: "red"
    },
    {
        id: 103,
        name: 'third',
        color: "green"
    }
];

const app = express();

// CORS configiration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');

    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'hello' });

});

app.post('/api/catalog', (req, res) => {
    const id = Math.random() * 999 | 0;
    req.body.id = id;
    data.push(req.body);
    res.json(req.body);
});

app.get('/api/catalog', (req, res) => {
    res.json(data);
});

app.get('/api/catalog/:id', (req, res) => {
    const id = req.params.id;
    const result = data.find(element => element.id == id);
    res.json(result);
});

app.put('/api/catalog/:id', (req, res) => {
    const id = req.params.id;
    let recordIndex;
    for (let i = 0; i < data.length; i += 1) {
        if (data[i].id == id) {
            recordIndex = i;
            break;
        }
    }
    if (recordIndex) {
        req.body.id = id;
        data[recordIndex] = req.body;
    }
    
    res.json(data[recordIndex]);
});


app.delete('/api/catalog/:id', (req, res) => {
    const id = req.params.id;
    let recordIndex;
    for (let i = 0; i < data.length; i += 1) {
        if (data[i].id == id) {
            recordIndex = i;
            break;
        }
    }
    if (recordIndex) {
        data.splice(recordIndex, 1);
        res.status(204).end();
    }
    
    console.log(data);
    res.end();
});


app.listen(3000, () => console.log('Server started on port 3000'));