const preload = require('../middleware/preload');
const { getAllHomes, searchHomes } = require('../services/housing');

const router = require('express').Router();



router.get('/', async (req, res) => {
    const allOffers = await getAllHomes();
    let offers;
    if (allOffers.length < 4) {
        offers = allOffers;
    } else {
        offers = allOffers.slice(-3);
    }
    
    res.render('home', {
        title: "Home Page",
        offers
    });
});


router.get('/catalog', async (req, res) => {
    const homes = await getAllHomes();
    res.render('catalog', {
        title: "Housing for rent",
        homes
    });
});



router.get('/details/:id', preload(true), async (req, res) => {
    res.locals.home.tenants = res.locals.home.rentedAHome.map(t => t.name).join(', ');
    if (req.session.user) {
        if (res.locals.home.owner == res.locals.user._id) {
            res.locals.user.isOwner = true;
        }
        if (!res.locals.user.isOwner && res.locals.home.rentedAHome.some(person => person._id == res.locals.user._id)) {
            res.locals.user.hasRented = true;
        }
    }
    // console.log(res.locals);
    res.render('details', {
        title: "Details Page"
    });
});


router.get('/search', (req, res) => {
    res.render('search', {
        title: "Search Page"
    });
});

router.post('/search', async (req, res) => {
    const results = await searchHomes(req.body.query);
    res.render('search', {
        title: "Search Page",
        results
    });
});
module.exports = router;