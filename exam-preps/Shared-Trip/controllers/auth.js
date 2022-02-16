const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');

const router = require('express').Router();


router.get('/register', (req, res) => {
    res.render('register');
});


router.post('/register', async (req, res) => {
    try {
        if (req.body.password != req.body.rePassword) {
            throw new Error('Passwords don\'t match');
        }
        const user = await register(req.body.email, req.body.password, req.body.gender);
        req.session.user = user;
        res.redirect('/'); // TODO check redirects requirements
    } catch (err) {
        const errors = mapErrors(err);
        res.render('register', {
            data: {
                email: req.body.email,
                password: req.body.password,
                rePassword: req.body.rePassword
            },
            errors
        });
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {  
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('login', {
            data: { email : req.body.email },
            errors
        });
    }
});

router.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});



module.exports = router;