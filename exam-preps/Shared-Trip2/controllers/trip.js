const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createTrip, getAllTrips, updateTripById, deleteTrip, joinTrip } = require('../services/trip');
const { registerTrip } = require('../services/user');
const { mapErrors } = require('../util/mappers');



router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: "Create Trip Offer" });
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
        await [createTrip(trip), registerTrip(req.session.user.email, trip._id)];
        // await registerTrip(req.session.user.email, trip._id);
        res.redirect('/catalog');

    } catch (err) {
        const errors = mapErrors(err);
        res.render('create', {
            data: trip,
            errors,
            title: "Create Offer Trip"
        })
    }
});



router.get('/catalog', async (req, res) => {
    const trips = await getAllTrips();
    res.render('catalog', {
        title: "Shared Trips",
        trips
    });
});



router.get('/details/:id', preload(), async (req, res) => {
    res.locals.trip.buddiesList = res.locals.trip.buddies.map(b => b.email).join(', ');
    if (req.session.user) {
        res.locals.trip.user = {
            id: req.session.user._id,
            isCreator: req.session.user._id == res.locals.trip.creator._id,
            hasJoined: res.locals.trip.buddies.some(buddy => buddy.email == req.session.user.email)
        };
    }
    // console.log(res.locals.trip);
    res.render('details', {
        title: "Trip Details"      
    });
});



router.get('/edit/:id', preload(), isOwner(), async (req, res) => {
    res.render('edit', { title: "Edit Offer" });
});
router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
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
        res.locals.trip = update;
        res.locals.trip._id = req.params.id;
        res.render('edit', { title: "Edit Offer", errors });
    }
});



router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteTrip(req.params.id);
    res.redirect('/catalog');
});



router.get('/join/:tripID/:buddyID', preload(), isUser(), async (req, res) => {
    try {
        await joinTrip(req.params.tripID, req.params.buddyID);
        res.redirect('/details/' + req.params.tripID);

    } catch (err) {
        console.log(mapErrors(err));
        res.redirect('/');
    }
});



module.exports = router;