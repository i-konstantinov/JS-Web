const { isUser } = require('../middleware/guards');
const { createTrip, getTripById, updateTripById, deleteTrip, joinTrip } = require('../services/trip');
const { mapErrors, tripViewModel } = require('../util/mappers');

const router = require('express').Router();


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: "Offer Trip" });
});

router.post('/create', isUser(), async (req, res) => {
    const trip = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        creator: req.session.user._id,
    }
    try {
        await createTrip(trip);
        res.redirect('/catalog');

    } catch (err) {
        const errors = mapErrors(err);
        res.render('create', {
            data: trip,
            errors,
            title: "Offer Trip"
        })
    }
});


router.get('/edit/:id', isUser(), async (req, res) => {
    const data = await getTripById(req.params.id);
    
    if (!data) {
        return res.redirect('/404');
    }
    if (req.session.user._id != data.creator._id) {
        return res.redirect('/login');
    }
    
    const existing = tripViewModel(data);

    res.render('edit', { title: "Edit Trip", trip: existing });
});


router.post('/edit/:id', isUser(), async (req, res) => {
    const data = await getTripById(req.params.id);
    
    if (!data) {
        return res.redirect('/404');
    }
    if (req.session.user._id != data.creator._id) {
        return res.redirect('/login');
    }
    
    const existing = tripViewModel(data);

    const update = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description
    }

    try {
        await updateTripById(req.params.id, update);
        res.redirect('/details/' + req.params.id);

    } catch (err) {
        const errors = mapErrors(err);
        res.render('edit', { title: "Edit Trip", trip: existing, errors });
    }
});


router.get('/delete/:id', isUser(), async (req, res) => {
    const existing = await getTripById(req.params.id);
    if (!existing) {
        return res.redirect('/404');
    }
    if (req.session.user._id != existing.creator._id) {
        return res.redirect('/login');
    }
    await deleteTrip(existing._id); 
    res.redirect('/catalog');
});


router.get('/join/:tripID/:buddyID', isUser(), async (req, res) => {
    
    const existing = await getTripById(req.params.tripID);
    if (!existing) {
        return res.redirect('/404');
    }
    if (req.session.user._id == existing.creator._id) {
        console.error('Creator cannot join his own trip');
        return res.redirect('/');
    }
    
    try {
        await joinTrip(req.params.tripID, req.params.buddyID);
        res.redirect('/details/' + req.params.tripID);
        
    } catch (err) {
        const errors = mapErrors(err);
        res.render('details', {
            title: "Trip Details",
            trip: existing,
            errors
        });
    }
});


module.exports = router;