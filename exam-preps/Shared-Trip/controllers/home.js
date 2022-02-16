const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('home', {title: 'Home Page'});
});


router.get('/catalog', (req, res) => {
    res.render('catalog');
});


module.exports = router;