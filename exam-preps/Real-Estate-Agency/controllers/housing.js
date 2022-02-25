const { redirect } = require('express/lib/response');
const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createHome, updateHomeById, rentHome } = require('../services/housing');
const { mapErrors } = require('../util/mappers');

const router = require('express').Router();



router.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: "Create Page"
    });
});
router.post('/create', isUser(), async (req, res) => {
    const home = {
        homeName: req.body.homeName,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        homeImage: req.body.homeImage,
        description: req.body.description,
        availablePieces: req.body.availablePieces,
        owner: res.locals.user._id
    }
    try {
        await createHome(home);
        res.redirect('/catalog');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('create', {
            title: "Create Page",
            data: home,
            errors
        });
    }
});




router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', {
        title: "Edit Page"
    });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const update = {
        homeName: req.body.homeName,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        homeImage: req.body.homeImage,
        description: req.body.description,
        availablePieces: req.body.availablePieces
    }
    try {
        await updateHomeById(req.params.id, update);
        res.redirect('/details/' + req.params.id);
    } catch (err) {
        const errors = mapErrors(err);
        update._id = req.params.id;
        res.locals.home = update;

        res.render('edit', {
            title: "Edit Page",
            errors
        });
    }
});



router.get('/rent/:id/:userId', preload(), isUser(), async (req, res) => {
    try{
        await rentHome(req.params.id, req.params.userId);
        res.redirect('/details/' + req.params.id);
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});


module.exports = router;