const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');
const { isGuest, isUser } = require('../middleware/guards');

const router = require('express').Router();


router.get('/register', isGuest(), (req, res) => {
    res.render('register', {title: "Register Page"});
});


router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password != req.body.rePassword) {
            throw new Error('Passwords don\'t match');
        }
        const user = await register(req.body.email, req.body.password, req.body.gender);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('register', {
            data: {
                email: req.body.email,
                password: req.body.password,
                rePassword: req.body.rePassword
            },
            errors,
            title: "Register Page"
        });
    }
});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', {title: "Login Page"});
});

router.post('/login', isGuest(), async (req, res) => {
    try {  
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('login', {
            data: { email : req.body.email },
            errors,
            title: "Register Page"
        });
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
});



module.exports = router;