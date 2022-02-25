const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');

const router = require('express').Router();


router.get('/register', (req, res) => {
    res.render('register', { title: "Register Page"});
});


router.post('/register', async (req, res) => {
    try {
        if (!req.body.password || req.body.password.length < 4) {
            throw new Error('The password should be at least 4 characters long');
        }
        if (req.body.password != req.body.repeatPassword) {
            throw new Error('Passwords don\'t match');
        }
        const user = await register(req.body.username, req.body.name, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('register', {
            title: "Register Page",
            data: {
                username : req.body.username,
                name: req.body.name
            },
            errors
        });
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: "Login Page"});
});

router.post('/login', async (req, res) => {
    try {  
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('login', {
            title: "Login Page",
            data: { username : req.body.username },
            errors
        });
    }
});

router.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});



module.exports = router;