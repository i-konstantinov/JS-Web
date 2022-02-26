const { getAllAds } = require('../services/ad');
const preload = require('../middleware/preload');

const router = require('express').Router();


router.get('/', async (req, res) => {
    const data = await getAllAds();
    let ads;
    if (data.length < 4) {
        ads = data;
    } else {
        ads = data.slice(0, 3);
    }
    for (let ad of ads) {
        ad.participants = ad.usersApplied.length;
    }
    res.render('home', { title: "Home Page", ads });
});



router.get('/catalog', async (req, res) => {
    const ads = await getAllAds();
    res.render('all-ads', {
        title: "All Ads",
        ads
    });
});



router.get('/details/:id', preload(true), (req, res) => {
    res.locals.ad.appliedStudents = res.locals.ad.usersApplied.length;
    if (req.session.user) {
        res.locals.ad.user = {
            id: req.session.user._id,
            isAuthor: req.session.user._id == res.locals.ad.author._id,
            hasApplied: res.locals.ad.usersApplied.some(user => user.email == req.session.user.email)
        }
    }
    
    res.render('details', {
        title: "Details Page"
    });
});


module.exports = router;