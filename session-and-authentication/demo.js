const express = require('express');
const expressSession = require('express-session');

const users = {
    'peter': {
        username: 'peter',
        password: '123'
    }
};

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

// req.session.user ще бъде зададено след автентикация
app.get('/', (req, res) => {
    const user = req.session.user || { username: 'Anonymous' }
    
    console.log(`Logged user: ${user.username}`);
    
    res.sendFile(__dirname + '/index.html'); 
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// req.body - парсъра, идва от express.urlencoded
// req.session идва от expressSession
app.post('/login', (req, res) => {
    const user = users[req.body.username];
    if (user && req.body.password == user.password) {
        console.log("Successful Login");
        req.session.user = user;
    } else {
        res.statusO(401).send("Incorrect username or password");
    }
    // console.log(req.session);
    res.redirect('/');
});

app.listen(3000);
