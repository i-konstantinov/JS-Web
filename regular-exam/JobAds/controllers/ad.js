const { isUser, isOwner } = require('../middleware/guards');
const { createAd, updateAdById, deleteAd, applyForAJob, searchAds } = require('../services/ad');
const { mapErrors } = require('../util/mappers');
const preload = require('../middleware/preload');

const router = require('express').Router();


router.get('/create', isUser(), (req, res) =>{
    res.render('create', { title: "Create Ad Page" });
});
router.post('/create', isUser(), async (req, res) => {
    const adData = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        author: req.session.user._id
    }
    try {
        await createAd(adData);
        res.redirect('/catalog');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('create', {
            title: "Create Ad Page",
            data: adData,
            errors
        });
    }
});



router.get('/edit/:id', preload(), isOwner(), async (req, res) => {
    res.render('edit', { title: "Edit Ad" });
});
router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const update = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription
    }

    try {
        await updateAdById(req.params.id, update);
        res.redirect('/details/' + req.params.id);

    } catch (err) {
        const errors = mapErrors(err);
        res.locals.ad = update;
        res.locals.ad._id = req.params.id;
        res.render('edit', { title: "Edit Ad", errors });
    }
});


router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    console.log('controler')
    await deleteAd(req.params.id);
    res.redirect('/catalog');
});


router.get('/apply/:adId/:userId', preload(), isUser(), async (req, res) => {
    try {
        await applyForAJob(req.params.adId, req.params.userId);
        res.redirect('/details/' + req.params.adId);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});


router.get('/search', isUser(), (req, res) => {
    res.render('search', {
        title: "Search Page"
    });
});

router.post('/search', isUser(), async (req, res) => {
    const ads = await searchAds(req.body.searchField);
    res.render('search', {
        title: "Search Page",
        results: ads 
    });
});



module.exports = router;