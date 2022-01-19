const express = require('express');

const app = express();

const catalogController = require('./catalog');

app.use('/catalog', catalogController);


app.get('/', (req, res) => {
    // .send = ".write" + ".end"
    // send може да го извикаме само веднъж!
    res.send('Hello Express!');
});

app.get('/create', (req, res) => {
    res.send('<form method="POST"><input name="name"/><button>Send</button></form>');
});

app.post('/create', (req, res) => {
    res.status(201);
    res.json({
        _id: "123",
        name: "soap",
        category: "hygiene",
        price: "9.99"
    });
});


// redirection
app.get('/about', (req, res) => {
    res.send('About page');
});
app.get('/contact', (req, res) => {
    res.redirect('/about');
});


// visualizing file
app.get('/hello', (req, res) => {
    res.sendFile(__dirname + '/sample.html');
});

// downloading files
app.get('/download', (req, res) => {
    res.download(__dirname + '/sample.pdf');
});

// изписва 404 за всеки път, който не е опоменат изрично
app.all('/*', (req, res) => {
    res.send('404 not found');
});

// стартираме сървъра
app.listen(3000);
