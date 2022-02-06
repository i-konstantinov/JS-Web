const express = require('express');
const expressSession = require('express-session');
const auth = require('./auth');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

// зареждаме authentication middleware
app.use(auth());


// home controller
// req.session.user ще бъде зададено след автентикация
app.get('/', (req, res) => {
    const user = req.session.user || { username: 'Anonymous' }
    
    console.log(`Logged user: ${user.username}`);
    
    
    res.sendFile(__dirname + '/index.html'); 
});


// login controller
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
app.post('/login', async (req, res) => {
    if (await req.auth.login(req.body.username, req.body.password)) {
        res.redirect('/');
    } else {
        res.status(401).send('Incorrect username or password');
    }
});


// register controller
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});
app.post('/register', async (req, res) => {
    if (await req.auth.register(req.body.username, req.body.password)) {
        res.redirect('/');
    } else {
        res.status(409).send('Username already exists');
    }
});

app.listen(3000);
