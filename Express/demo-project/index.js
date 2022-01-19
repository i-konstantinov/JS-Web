const express = require('express');

const app = express();

const catalogController = require('./catalog');

const { loggedUser } = require('./auth');

app.use((req, res, next) => {
    console.log(`>>> ${req.method} ${req.url}`);
    next();
});

app.use(
    '/catalog',
    catalogController
);


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
// app.get('/sample', (req, res) => {
//     res.download(__dirname + '/sample.pdf');
// });

// middleware example
// middleware-a се подава между пътя и хендлъра;
// параметъра next представлява следващата функция;
// с него викаме следващият middleware или хендлър;
// ако не извикаме next(); клиента ще зависне;
// особено полезно ,ако middleware-a е асинхронен!;
app.get(
    '/sample',
    (req, res) => {
        res.download(__dirname + '/sample.pdf');
    }
);

// изписва 404 за всеки път, който не е опоменат изрично
app.all('/*', (req, res) => {
    res.send('404 not found');
});

// стартираме сървъра
app.listen(3000);
