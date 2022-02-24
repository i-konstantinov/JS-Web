const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');

const router = require('express').Router();


router.get('/register', (req, res) => {
    res.render('register', { title: "Register Page" });
});


router.post('/register', async (req, res) => {
    try {
        if (req.body.password.trim() == "") {
            throw new Error('Password is required');
        }
        if (req.body.password != req.body.repeatPassword) {
            throw new Error('Passwords don\'t match');
        }
        const user = await register(req.body.email, req.body.password, req.body.gender);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('register', {
            title: "Register Page",
            data: { email: req.body.email, isMale: req.body.gender == 'male' ? true : false },
            errors
        });
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: "Login Page" });
});

router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('login', {
            title: "Login Page",
            data: { email: req.body.email },
            errors
        });
    }
});

router.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});



module.exports = router;