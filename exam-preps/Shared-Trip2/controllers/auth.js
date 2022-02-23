const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');

const router = require('express').Router();


router.get('/register', (req, res) => {
    res.render('register');
});

// TODO check form action, method, field names
router.post('/register', async (req, res) => {
    try {
        if (req.body.password != req.body.repeatPassword) {
            throw new Error('Passwords don\'t match');
        }
        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/'); // TODO check redirects requirements
    } catch (err) {
        const errors = mapErrors(err);
        res.render('register', {
            data: { username : req.body.username },
            errors
        });
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {  
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('login', {
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